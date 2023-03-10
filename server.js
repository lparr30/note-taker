const express = require("express");
const path = require("path")

const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("public")) //static refers to the file path not changing, html, css, etc. all stay within "public" folder

//routing
// app.get("/testing/test/testiiiiing/tests", (req, res) => {
//     res.json({
//         "dog": "Husky",
//         "name": "Cloud"
//     })
// })

app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    res.json({
        name: "some db idk"
    })
})

app.post("/api/notes", (req, res) => {
    res.json({
        name: "some db idk"
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.listen(PORT, () => {
    console.log("yo we're alive")
})