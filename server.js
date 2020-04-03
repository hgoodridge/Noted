const express = require("express")
const fs = require("fs")
const path = require("path")
const PORT = process.env.PORT|| 8080
const app = express()
const db = require("./db/db.json")
// const journal = require("./journal.json")


app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//html routes
app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname + "/public/index.html"))
}) 


app.get("/notes", (req,res)=>{
    res.sendFile(path.join(__dirname + "/public/notes.html"))
})
app.get("/api/notes", function (req, res) {
    res.json(db)
})

//api routes
app.post("/api/notes", (req,res)=>{
    let id
    if(!db.length){
        id = 1
    }else{
        id = db[db.length-1].id + 1
    }
    const newNote = {
        id:id,
        title:req.body.title,
        text:req.body.text
    }
    db.push(newNote)
    console.log(newNote)
    console.log(db)
    fs.writeFile("./db/db.json",JSON.stringify(db),function(err){
        if(err) throw err
        res.json(newNote)
    })

})
app.delete("/api/notes/:id",(req,res)=>{
    var deletedNoteIndex
    for(var i = 0; i < db.length; i++){
        if(db[i].id === req.params.id){
            deletedNoteIndex = i
        }
        
    }
    
    db.splice(deletedNoteIndex, 1)
    fs.writeFile("./db/db.json",JSON.stringify(db),function(err){
        if(err) throw err
    
    })
    res.sendStatus(200)
})
app.listen(PORT,()=>{
    console.log(`live at http://localhost:${PORT}`)
})