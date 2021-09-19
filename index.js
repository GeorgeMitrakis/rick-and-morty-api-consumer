const path = require("path");
const express = require("express");
const app = express();

const PORT = 3000;

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.listen(PORT, () => {
    console.log("Application started and listening on http://localhost:3000");
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public/index.html"));
});