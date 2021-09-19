const path = require("path");
const express = require("express");
const app = express();

const PORT = 3000;

const isProduction = true;
const ROOT = isProduction ? "public" : "src";

app.use("/", express.static(path.join(__dirname, ROOT)));
app.use("/images", express.static(path.join(__dirname, "images")));

app.listen(PORT, () => {
    console.log("Application started and listening on http://localhost:3000");
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, `${ROOT}/index.html`));
});