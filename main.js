const express = require('express')
const path = require("path");
const sass = require("node-sass-middleware")

const app = express()
const port = process.env.PORT || 80

app.use("/", sass({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    outputStyle: 'compressed'
}));
app.use("/", express.static(path.join(__dirname, "public")));
app.listen(port);
