// The maim work of this file is use to create server

// To use express in this file
const express = require("express")
// created server with this line
const app = express()
app.use(express.json())

const notes = []
// notes will take an object containing Title and Description

// API method -> POST name-> /notes
app.post('/notes', (req, res) =>{
    notes.push(req.body)

    res.status(201).json({
        message : "Note created successfully"
    })
})

app.get('/notes', (req, res) =>{

    res.status(200).json({
        message : "Notes fetched successfully",
        notes : notes
    })
})

app.delete('/notes/:index', (req, res)=>{
    const index = req.params.index

    delete notes[index]

    res.status(200).json({
        message: "Note deleted successfully"
    })
})

app.patch("/notes/:index", (req, res)=>{
    const index = req.params.index

    const description = req.body.description

    notes[index].description = description

    res.status(200).json({
        message : "Note updated successfully"
    })
} )


// To export the app variable
module.exports = app
