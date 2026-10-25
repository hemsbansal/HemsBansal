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
| `public/404.html` | Not found page |
| `public/style.css` | Shared styles for every page |

## Editing

- Update the **Now** list in `public/index.html` every few months.
- New note: copy a file in `public/notes/`, change the text, and add a row to the Notes list in `public/index.html`.
- Preview locally: open `public/index.html` in a browser, or run `npx serve public`

## Deploying

Hosted on Netlify, connected to this repo. Every push to `main` goes live on https://hemsbansal.in.
