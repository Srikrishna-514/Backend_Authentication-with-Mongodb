const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { AuthUserModel } = require("../Models/AuthModel.js");
dotenv.config();
const userSignUp = async (req, res) => {
  try {
    const { username, email, password, bio } = req.body;
    if (username && email && password) {
      // console.log(username, email, password);
      const hashedPassword = bcrypt.hashSync(password, 12);
      // console.log(hashedPassword);
      const userAuthZData = await AuthUserModel.create({
        username: username,
        password: hashedPassword,
        email: email,
        bio: bio || "",
      });
      // console.log(hashedPassword);
      const userData = userAuthZData;
      res.json({
        message: "User data added successfully",
        name: userData.username,
        email: userData.email,
        bio: userData.bio,
      });
    } else {
      res.send("pls enter fields");
    }
  } catch (error) {
    res.json({ error_message: error.message });
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthUserModel.findOne({ email: email });
    // console.log(user);
    if (user) {
      const passwordCheck = bcrypt.compareSync(password, user.password);
      // console.log(passwordCheck);
      console.log(user);
      console.log(user.username);

      if (passwordCheck) {
        const jwt_token = jwt.sign(
          { username: user.username },
          process.env.jwt_security_Key,
        );
        console.log(jwt_token);

        res.status(200).json({
          msg: "login successfully",
          userInfo: {
            username: user.username,
            bio: user.bio,
            email: user.email,
          },
        });
      }
    } else {
      res.status(400).send("invalid email or password");
    }
  } catch (error) {
    res.send(429).json({ error_msg: error.message });
  }
};
const userProfile = async (req, res) => {
  try {
    console.log(req.userId);
    const userInfo = await AuthUserModel.findById(req.userId).select([
      "-password",
      "-createdAt",
      "-updatedAt",
      "-__v",
      "-_id",
    ]);
    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "user data retrived successfully", Info: userInfo });
  } catch (error) {
    console.log("profile_error :", error.message);
    return res.status(500).json({ message: "Internal server Error" });
  }
};
module.exports = { userLogin, userSignUp, userProfile };
