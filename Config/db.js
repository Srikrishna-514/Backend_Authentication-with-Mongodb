const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const db_Name = process.env.db_Name;
const uri = process.env.mongoose_uri;
function connectDB() {
  try {
    mongoose
      .connect(uri, { dbName: db_Name })
      .then((res) =>
        console.log("Mongodb DataBase connected successfully with " + db_Name),
      );
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
