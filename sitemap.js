const fs = require("fs");
const { resolve } = require("path");
const glob = require("glob");
const sitemap = resolve(__dirname, "public", "sitemap.xml");

const nodes = [
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">',
];

glob("public/**/index.html", (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach((f) => {
    nodes.push(
      `<url><loc>https://lively-vacherin-d20005.netlify.app${f
        .replace("public", "")
        .replace("index.html", "")}</loc></url>`
    );
  });
  nodes.push("</urlset>");
  fs.writeFile(sitemap, nodes.join(""), (err) => {
    if (err) {
      throw err;
    }
  });
});
