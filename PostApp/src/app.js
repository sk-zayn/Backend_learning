const express = require("express")
const postModel = require("./models/post.model")
const multer = require("multer")
const uploadFile = require("./services/storage.services")


const app = express()
app.use(express.json())
const upload = multer({storage: multer.memoryStorage()})


app.post("/create-post",upload.single("image"), async (req, res)=>{
    console.log(req.body);

    const result = await uploadFile(req.file.buffer)

    const post = await postModel.create({
        image : result.url,
        caption : req.body.caption
    })

    return res.status(201).json({
        message: "Post created successfully",
        post

    })
})


module.exports = app
