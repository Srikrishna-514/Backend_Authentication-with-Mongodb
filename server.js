const express = require("express");
const connectDB = require("./Config/db.js");
const { route } = require("./Routes/AuthRoutes.js");
const dotenv = require("dotenv");
const app = express();
connectDB();
dotenv.config();
//middleWares
app.use(express.json());
app.use(express.urlencoded());
//Routes
app.use("/authZ", route);

//default Api
app.use("/", (req, res) => {
  res.send("its default Api missing end points pls check once");
});
const port = process.env.Port || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
