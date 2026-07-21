const app = require("./src/app")
const connectDB = require("./src/db/db")


// Here we are calling the connectDB function that we wrote in db.js file
connectDB()
app.listen(3000, ()=>{
    console.log("Server is running on port 3000");

})

