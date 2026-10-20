const {
  userLogin,
  userSignUp,
  userProfile,
} = require("../Controllers/AuthController.js");

const { checkAuthZ } = require("../middleWares/authZMiddleWare.js");
const express = require("express");
const route = express.Router();
route.post("/signup", userSignUp);
route.post("/login", userLogin);
route.get("/profile", checkAuthZ, userProfile);
module.exports = { route };
