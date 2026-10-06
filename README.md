# Todo App

A lightweight todo app built with plain HTML, CSS, and JavaScript — no build step, no dependencies.

**Live demo:** https://sagoresarkerbdcse.github.io/todoapp/

## Features

- Add, complete, edit (double-click), and delete todos
- Filter by All / Active / Completed
- Mark all done, clear completed
- Saved automatically in your browser (`localStorage`), synced across open tabs
- Light and dark themes (follows your system by default)
- Responsive, keyboard and screen-reader friendly

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

`.github/workflows/pages.yml` copies the site files to the `gh-pages` branch on every push to `main`
(or the current default branch), and GitHub Pages serves that branch.

If the site isn't live, open **Settings → Pages** and set **Source** to *Deploy from a branch*,
branch `gh-pages`, folder `/ (root)`.

Live at `https://sagoresarkerbdcse.github.io/todoapp/`.
