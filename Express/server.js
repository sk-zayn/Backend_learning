// In this file we start the server. we created the server in app.js file
const app = require("./src/app")



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

