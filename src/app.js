import express from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = 3000;
const ROOT = __dirname + "/wwwroot";

const app = express();

app.use(express.static(ROOT));

app.listen(PORT, () => {
    console.log("Application started and listening on port 3000");
});

app.get("/", (req, res) => {
    res.sendFile(ROOT + "/index.html");
});