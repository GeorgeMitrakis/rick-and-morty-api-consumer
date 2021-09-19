const path = require("path");
const express = require("express");

const PORT = 3000;


const app = express();

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.listen(PORT, () => {
    console.log("Application started and listening on http://localhost:3000");
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});