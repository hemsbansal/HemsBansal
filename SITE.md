# hemsbansal.in

Personal site of Hemant Bansal. Plain HTML and CSS, no build step.

Everything in `public/` is the website. Files outside it (like this file and the GitHub profile `readme.md`) stay in the repo but are not published.

## Structure

| Path | Page |
|---|---|
| `public/index.html` | Home. Desktop: hero, metro map, project tickets, notes, chat. Phone: an app with Home, Route, Passes and Chat tabs |
| `public/home.css`, `public/home.js` | Homepage styles and behaviour (tabs, passes, scripted chat) |
| `public/notes/` | Short write-ups |
| `public/resume/` | Resume (prints cleanly) |
| `public/uses/` | Tools I use |
| `public/bugs/` | Bug log |
| `public/404.html` | Not found page |
| `public/style.css` | Shared styles for every page |
| `public/site.js` | Shared script: copy button, English/Hindi switch, easter egg, offline support |
| `public/sw.js` | Offline support. Bump `VERSION` after big changes so visitors get fresh files |
| `public/manifest.webmanifest`, `public/icons/` | Lets people install the site as an app |

## Editing

- Update the **Now** list in `public/index.html` every few months.
- New note: copy a file in `public/notes/`, change the text, and add a row to the Notes list in `public/index.html`.
- Preview locally: open `public/index.html` in a browser, or run `npx serve public`

## Chat answers

The Say hello chat is scripted. Its answers live in `public/home.js` under `answers`.

## Deploying

Hosted on Netlify, connected to this repo. Every push to `main` goes live on https://hemsbansal.in.
