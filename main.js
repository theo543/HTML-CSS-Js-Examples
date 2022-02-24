const express = require('express')
const path = require("path");
const sass = require("node-sass-middleware")
const postcss = require("postcss-middleware")

const app = express()
const port = process.env.PORT || 80

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(sass({
        src: path.join(__dirname, 'public'),
        outputStyle: 'nested'
}));
app.use(/^.*\.css$/, postcss({
        plugins: [require("autoprefixer"), require("cssnano")],
        src: function(req) {
            return path.join(__dirname, "public", req.originalUrl);
        }
}));
app.use("/", express.static(path.join(__dirname, "public")));
app.listen(port);
console.log(`Listening on ${port}!`);
