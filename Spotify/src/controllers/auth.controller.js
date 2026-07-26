const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

/*
  ===============================
  REGISTER API - STEP BY STEP FLOW
  ===============================
  1) Extract required fields (username, email, password, role) from req.body
  2) Check if a user already exists with the same username or email
     -> If yes, return 409 (Conflict) status
  3) If user does not exist, hash the plain text password using bcrypt
  4) Create a new user document in the database with the hashed password
  5) Generate a JWT token for the newly created user (used for authentication)
  6) Store that token inside a cookie so the client can send it automatically
     on future requests
  7) Send a 201 (Created) response with a success message and basic user info
     (never send the password back, even the hashed one)
*/

async function registerUser(req, res) {
  // -----------------------------------------
  // STEP 1: Extract data sent by the client
  // -----------------------------------------
  // role defaults to "user" if not provided in the request body
  const { username, email, password, role = "user" } = req.body;

  // -----------------------------------------
  // STEP 2: Check if the user already exists
  // -----------------------------------------
  // $or lets us match a document if EITHER the username OR the email
  // already exists in the collection
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  // If a matching user was found, stop here and inform the client
  // 409 = Conflict (resource already exists)
  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "User already exists ",
    });
  }

  // -----------------------------------------
  // STEP 3: Hash the password before storing
  // -----------------------------------------
  // Never store plain text passwords in the database.
  // The second argument (10) is the "salt rounds" — higher = more secure,
  // but slower to compute. 10 is a common, safe default.
  const hash = await bcrypt.hash(password, 10);

  // -----------------------------------------
  // STEP 4: Create the new user in the database
  // -----------------------------------------
  const user = await userModel.create({
    username,
    email,
    password: hash, // storing the hashed password, not the raw one
    role,
  });

  // -----------------------------------------
  // STEP 5: Generate a JWT token for this user
  // -----------------------------------------
  // The payload contains just enough info to identify the user later
  // (id and role) — avoid putting sensitive data like passwords here,
  // since JWT payloads are only encoded, not encrypted.
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET
    // NOTE: You currently don't have an expiry set (e.g. { expiresIn: "7d" }).
    // Without it, this token never expires — usually not recommended
    // for production apps.
  );

  // -----------------------------------------
  // STEP 6: Send the token back via a cookie
  // -----------------------------------------
  // This stores the token on the client (browser) so it can be sent
  // automatically with future requests.
  // Consider adding options for better security in production:
  // res.cookie("token", token, {
  //   httpOnly: true,   // prevents client-side JS from accessing the cookie
  //   secure: true,     // only sent over HTTPS
  //   sameSite: "strict"
  // });
  res.cookie("token", token);

  // -----------------------------------------
  // STEP 7: Respond with success
  // -----------------------------------------
  // 201 = Created (a new resource, i.e., the user, was successfully created)
  // We only send back safe, non-sensitive user info — never the password/hash.
  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

async function loginUser(req, res){
  const {username, email, password} = req.body

  const user = await userModel.findOne({
    $or: [
      {username},
      {email}
    ]
  })

  if(!user){
    return res.status(401).json({
      message: "Invalid Credentials"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if(!isPasswordValid){
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign({
    id: user._id,
    role: user.role
  }, process.env.JWT_SECRET)

  res.cookie("token", token)

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id : user._id,
      username : user.username,
      email: user.email,
      role: user.role
    }
  })

}

module.exports = { registerUser , loginUser};
