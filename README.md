# Todo App

A lightweight todo app built with plain HTML, CSS, and JavaScript — no build step, no dependencies.

**Live demo:** https://sagoresarkerbdcse.github.io/todoapp/ (after GitHub Pages is enabled, see below)

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

The workflow in `.github/workflows/pages.yml` publishes the site on every push to `main`.

One-time setup:

1. Merge this code into `main`.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Re-run the workflow (Actions → *Deploy to GitHub Pages* → *Run workflow*) or push to `main`.

The site will be available at `https://<your-username>.github.io/todoapp/`.
