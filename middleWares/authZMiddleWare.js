const dotenv = require("dotenv");
const { AuthUserModel } = require("../Models/AuthModel.js");
const jwt = require("jsonwebtoken");

dotenv.config();

const checkAuthZ = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    // 1. Check whether the Authorization header exists
    if (!authorization) {
      return res.status(401).json({
        message: "Authorization token is required",
      });
    }

    // 2. Extract the token from "Bearer <token>"
    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    // 3. Verify the JWT token
    const decode = jwt.verify(token, process.env.jwt_security_Key);

    // 4. Find the user using the decoded username
    const user = await AuthUserModel.findOne({
      username: decode.username,
    }).select("_id");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    } else {
      req.userId = user._id;
      next();
    }
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { checkAuthZ };
