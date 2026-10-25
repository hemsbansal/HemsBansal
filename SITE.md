# hemsbansal.in

Personal site of Hemant Bansal. Plain HTML and CSS, no build step.

Everything in `public/` is the website. Files outside it (like this file and the GitHub profile `readme.md`) stay in the repo but are not published.

## Structure

| Path | Page |
|---|---|
| `public/index.html` | Home: intro, now, notes, things I've built |
| `public/notes/` | Short write-ups |
| `public/resume/` | Resume (prints cleanly) |
| `public/uses/` | Tools I use |
| `public/bugs/` | Bugs I've loved |
| `public/status/` | A playful status page about me |
| `public/404.html` | Not found page |
| `public/style.css` | Shared styles for every page |
| `public/site.js` | Shared script: copy button, English/Hindi switch, easter egg, offline support |
| `public/sw.js` | Offline support. Bump `VERSION` after big changes so visitors get fresh files |
| `public/manifest.webmanifest`, `public/icons/` | Lets people install the site as an app |

## Editing

- Update the **Now** list in `public/index.html` every few months.
- New note: copy a file in `public/notes/`, change the text, and add a row to the Notes list in `public/index.html`.
- Preview locally: open `public/index.html` in a browser, or run `npx serve public`

## Hindi text

On the homepage, each English line has a Hindi twin marked `data-hi`. Edit both when you change the text.

## Deploying

Hosted on Netlify, connected to this repo. Every push to `main` goes live on https://hemsbansal.in.
