const express = require('express')
const path = require("path");
const sass = require("node-sass-middleware")
const postcss = require("postcss-middleware")
const views = ["/index", "/js", "/css", "/html"]

const app = express()
const port = process.env.PORT || 80

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(sass({
        src: path.join(__dirname, 'public'),
        outputStyle: 'compressed'
}));
app.use(/^.*\.css$/, postcss({
        plugins: [require("autoprefixer"), require("cssnano")],
        src: function(req) {
            return path.join(__dirname, "public", req.originalUrl);
        }
}));
app.all("/", ((req, res, next) => res.redirect("/index")));
app.all("*.pug", ((req, res, next) => res.redirect(req.originalUrl.slice(0, -4))));
app.all(views, ((req, res, next) => {
        const p = path.join(__dirname, "public", req.originalUrl) + ".pug";
        res.render(p, {path: p});
}))
app.use("/", express.static(path.join(__dirname, "public")));
app.listen(port);
console.log(`Listening on ${port}!`);
