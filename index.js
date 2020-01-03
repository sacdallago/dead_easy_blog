const path = require('path');
const fs = require('fs');
const showdown  = require('showdown');
const converter = new showdown.Converter();

const source = path.join(__dirname, 'source');
const destination = path.join(__dirname, 'blog');

let template_html;
let html_content;
let final_html;

let log_error = (e) => console.error(e);

let handle_files = (error, files) => {
    error && log_error(error);

    files.forEach((file) => {
        fs.readFile(path.join(source, file), 'utf8', (error, text) => {
            error && log_error(error);

            html_content = converter.makeHtml(text);
            final_html = template_html
                .replace(
                    /_TITLE_REPLACE_HERE_/g,
                    file
                        .replace('.md', '')
                        .replace(/_/g, ' ')
                )
                .replace('_CONTENT_REPLACE_HERE_', html_content);

            fs.writeFile(
                path.join(destination, file.replace('.md', '.html')),
                final_html,
                error => error && log_error(error)
            );
        })
    });
};

let write_index = posts => {
    html_content = "<ol>";

    posts.forEach(p => {
        html_content +=
            "<li class='"+ p.tags.join(" ") +"'>" +
            "<a href='" + p.filename.replace('.md', '.html') + "'>" +
            p.filename.replace('.md', '').replace(/_/g, ' ') +
            "</a>" +
            "</li>";
    });

    html_content += "</ol>";

    final_html = template_html
        .replace(/_TITLE_REPLACE_HERE_/g, "Registry")
        .replace('_CONTENT_REPLACE_HERE_', html_content);

    fs.writeFile(
        path.join(destination, 'index.html'),
        final_html,
        error => error && log_error(error)
    );
};

fs.readFile('template.html', 'utf8', (error, text) => {
    error && log_error(error);

    template_html = text;

    if(process.argv.length > 2) {
        /**
         * Argv 3 is a path to a JSON file that contains an array in the following format:
         * [
         *   {
         *       filename: "my_post.md"
         *       tags: ["tag1", "tag_two"],
         *   }
         * ]
         */
        let posts = require(process.argv[2]);

        handle_files(null, posts.map(e => e.filename));
        write_index(posts);
    } else {
        fs.readdir(source, handle_files);
    }
});



