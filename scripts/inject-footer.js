#!/usr/bin/env node
// Injects partials/footer.html into every top-level page of the site.
//
// The footer markup lives in ONE place: partials/footer.html.
// To change the footer (address, phone, links, copyright year, etc.):
//   1. Edit partials/footer.html
//   2. Run: node scripts/inject-footer.js
// This rewrites the content between the FOOTER:START/FOOTER:END markers
// in every *.html file at the project root, so the change is picked up
// consistently everywhere, including any new page you add later (just
// add the two marker comments before its closing </body> tag and add
// <link rel="stylesheet" href="assets/css/footer.css"> to its <head>).
//
// The footer is written directly into each page's HTML (not fetched at
// runtime via JavaScript) so the business name, address, phone, and email
// are present in the page source for search engines and Meta Business
// Verification to read.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FOOTER_PATH = path.join(ROOT, 'partials', 'footer.html');
const CSS_LINK = '<link rel="stylesheet" href="assets/css/footer.css">';
const START = '<!-- FOOTER:START -->';
const END = '<!-- FOOTER:END -->';

// Fragments that get embedded into another page via JS (e.g. fetch()) and
// are not full documents on their own — they must not get their own footer.
const EXCLUDE = new Set(['explore-system.html']);

function main() {
  const footer = fs.readFileSync(FOOTER_PATH, 'utf8').trim();
  const block = `${START}\n${footer}\n${END}`;

  const files = fs
    .readdirSync(ROOT)
    .filter((f) => f.endsWith('.html') && !EXCLUDE.has(f));

  let changed = 0;
  for (const file of files) {
    const filePath = path.join(ROOT, file);
    const original = fs.readFileSync(filePath, 'utf8');
    let html = original;

    if (!html.includes('assets/css/footer.css')) {
      html = html.includes('</head>')
        ? html.replace('</head>', `  ${CSS_LINK}\n</head>`)
        : `${CSS_LINK}\n${html}`;
    }

    const startIdx = html.indexOf(START);
    const endIdx = html.indexOf(END);
    if (startIdx !== -1 && endIdx !== -1) {
      html = html.slice(0, startIdx) + block + html.slice(endIdx + END.length);
    } else if (html.includes('</body>')) {
      html = html.replace('</body>', `${block}\n</body>`);
    } else {
      html = `${html}\n${block}\n`;
    }

    if (html !== original) {
      fs.writeFileSync(filePath, html, 'utf8');
      changed++;
    }
  }

  console.log(`Footer synced into ${changed} of ${files.length} file(s).`);
}

main();
