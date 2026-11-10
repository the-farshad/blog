# blog.thefarshad.com

Static blog served via GitHub Pages on `blog.thefarshad.com`.

## Layout

```
index.html        list of posts, grouped by topic
posts/post.html   page that renders a post from its Markdown file
posts/<topic>/    one Markdown file per post (notes/, research/)
scripts/          theme and font picker, post rendering
styles/           CSS
assets/           images / favicon
feed.xml          RSS feed
CNAME             custom domain
```

Posts are written in Markdown and rendered in the browser: `posts/post.html?p=<topic>/<slug>.md` fetches the file and converts it with [marked](https://marked.js.org/).

## Adding a post

1. Create `posts/<topic>/<slug>.md`, starting with a front matter block, then the body in Markdown:

   ```
   ---
   title: Post title
   date: YYYY-MM-DD
   ---
   ```

2. Add an `<li>` linking to `./posts/post.html?p=<topic>/<slug>.md` in that topic's section of `index.html`, newest first.
3. Add an `<item>` for the post to `feed.xml`, newest first, and update `lastBuildDate`.

After changing `styles/style.css`, raise the `?v=` number on the stylesheet links in `index.html` and `posts/post.html`, so browsers load the new version instead of a cached one.

## Local preview

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Posts are fetched by the browser, so open them through the server rather than as local files.
