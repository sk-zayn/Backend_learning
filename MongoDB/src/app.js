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

app.delete("/notes/:id", async (req, res)=>{
  const id = req.params.id;
  // findOneAndDelete -> needs a param to delete something on that base
  await noteModel.findOneAndDelete({
    _id: id,
  });
  res.status(200).json({
    message: "Note deletes successfully",
  });
})

app.patch("/notes/:id", async (req, res)=>{
  const id = req.params.id;
  const description = req.body.description;
  // findOneAndUpdate() needs 2 param 1) to know on which basis 2)to updata
  await noteModel.findOneAndUpdate({ _id: id }, { description: description });

  res.status(200).json({
    message: "Note updated successfully",
  });
})



module.exports = app
