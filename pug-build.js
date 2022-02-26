const pug = require("pug")
const fs = require("fs")
const path = require("path")
const pages = {'index': 'Home', 'html': 'HTML', 'css': 'CSS', 'js': 'Javascript'} // path => name
const tgtExt = ".html"

Object.keys(pages).forEach((p) => {
    p = path.join(__dirname, "src", p);
    fs.writeFile(p + tgtExt, pug.renderFile(p + ".pug", {pages: pages, path: p, ext: tgtExt}), () => {});
});
