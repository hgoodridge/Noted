const express = require("express")
const fs = require("fs")
const path = require("path")
const PORT = process.env.PORT|| 8080
const app = express()
const db = require("./db/db.json")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname + "/public/index.html"))
}) 


app.get("/notes", (req,res)=>{
    res.sendFile(path.join(__dirname + "/public/notes.html"))
})
app.get("/api/notes", function (req, res) {
    res.json(db)
})

app.post("/api/notes", (req,res)=>{
    const newNote = req.body
    noteListItems.push(newNote)
    res.json(newNote)
})
app.delete("/api/notes",(req,res)=>{

})
app.listen(PORT,()=>{
    console.log(`"live at http://localhost:${PORT}"`)
})