const path = require("path")

module.exports = {
    entry: path.resolve(__dirname, "src/js/homepage.js"),
    output: {
        path: path.resolve(__dirname, "src"),
        filename: "homepage_bundle.js",
    },
    mode: "production"
}