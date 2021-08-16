import express from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ApiConsumer } from './wwwroot/js/apiConsumer.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = 3000;
const ROOT = __dirname + "/wwwroot";

const app = express();

app.use(express.static(ROOT));

app.listen(PORT, async () => {
    console.log("Application started and listening on http://localhost:3000");
    console.log(await ApiConsumer.fetchAllCharacters())
});

app.get("/", (req, res) => {
    res.sendFile(ROOT + "/index.html");
});