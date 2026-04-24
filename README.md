# blog.thefarshad.com

Static blog served via GitHub Pages on `blog.thefarshad.com`.

## Layout

```
index.html      list of posts
posts/          one HTML file per post
styles/         CSS
assets/         images / favicon
CNAME           custom domain
```

## Adding a post

1. Copy `posts/hello-world.html` and rename it (e.g. `my-post.html`).
2. Edit the title, date, and body.
3. Add a new `<li>` to `index.html` linking to it.

## Local preview

```sh
python3 -m http.server 8000
```
