const express = require("express")
const noteModel = require("./models/note.model")



const app = express()

// to read the data in the body this line is important
app.use(express.json())

// post -> to send the data to server/database
app.post("/notes", async (req, res)=>{
    const data = req.body
    await noteModel.create({
        title : data.title,
        description : data.description
    })
    res.status(200).json({
        message: "Note created successfully"
    })
})


// get -> to fetch data from server/database
// find() -> if data [{},{}] & if no data []
// findone() -> if data {},{},{} & if no data null
app.get("/notes", async (req, res)=>{
    // find will give an array of all the object inside the noteModel which will be stored in notes
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes fetched successfully",
        notes : notes

    })
})



module.exports = app
