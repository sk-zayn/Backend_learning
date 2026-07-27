const musicModel = require("../models/music.model")
const jwt = require("jsonwebtoken")
require("dotenv").config()

async function createMusic(req, res){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decode.role !== "artist"){
            return res.status(403).json({message: "You don't have access to create music"})
        }
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    }

    const {title} = req.body
    const file = req.file




}
