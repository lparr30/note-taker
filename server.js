const express = require("express");
const path = require("path")
const data = require('./db/db.json');
const fs = require('fs');
const uuid = require('uuid');

const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json()) //middleware that parses the body
app.use(express.static("public")) //static refers to the file path not changing, html, css, etc. all stay within "public" folder --> gives server access to items in public folder

app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    console.log('console.log tattoo')
    res.json(data)
})

app.post("/api/notes", (req, res) => {
    // POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

    // receive request
    console.log(req.body);
    // get a handle on the note data from the request body
    const newNote = req.body;
    newNote.id = uuid.v4();
    // add the note to the data object
    data.push(newNote);
    // write the data object to the db.json file
    fs.writeFileSync('./db/db.json', JSON.stringify(data, null, 2));
    res.json('okay, eez good');
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.listen(PORT, () => {
    console.log("yo we're alive")
})