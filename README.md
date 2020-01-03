# Dead simple blog

I started with the following requirements:

- Host blog on GitHub pages (aka: static HTML)
- Write posts in Markdown
- Extremely minimal design, but don't look like 💩
- Eventually be able to filter posts on an index page via tags

Ultimately, IMO, I was able to satisfy all my points. It's not perfect, but it does exactly what I set out for. So: deploy.

If you want to use this, depending on your level of laziness:

#### I just want to write blog posts
To do this:
1. Fork this repo
2. Set up GitHub pages, add a CNAME if custom domained
3. Write whatever posts you want in the folder `source` and name the files as the title of your blog posts, using underscores, e.g.: `my_holiday_in_rome.md`
4. From the root of the fork, run `npm install && npm run dead_easy`

#### I want to write blog posts and create an index.html with links to the posts

Do 1-3 above, then:

1. Update the file `template.json` with your post names and tags (tags must be underscore separated).
2. From the root of the fork, run `npm install && npm run easy`. Notice it's **easy** this time, not **dead_easy** :).

#### I want to write blog posts, create an index.html && change the style, google analytics, etc.

Well, you are a pro! So you should know what to do. As a heads up: do as above + change template.html and template.css to fit your needs. Important here, don't change `_TITLE_REPLACE_HERE_` and `_CONTENT_REPLACE_HERE_` in `template.html` except if you know what you are doing. These are used to inject title and markdown content.
