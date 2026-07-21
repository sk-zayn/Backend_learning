// In this db.js file we write the whole logic of how to connect the server to the database this code will be executed by server.js file
// the file that tells the server to connect to the database will be server.js


require("dotenv").config();

// Requiring mongoose to use in this file
const mongoose = require("mongoose");

const dns = require("dns");

// Node on this machine can't auto-detect the Windows DNS servers,
// so we point it at Google's DNS explicitly before connecting.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Here we are just calling the function mongoose.connect() to connect the server to the database
// we are using asyn and await to connect the server first
async function connectDB() {
  await mongoose.connect(
    // it needs the (URI of the database) to connect the server to the database
    // the uri we get from mongodb compass (mongodb+srv://Backend:< password >@backend-sheriyans.nahlvz2.mongodb.net/)
    // is just till the cluster but here we need till the database
    // so at the end we add database name & if database is not present it will create one with that name
    process.env.MONGO_URI,
  );
  console.log("Conneted to DB");
}

module.exports = connectDB
