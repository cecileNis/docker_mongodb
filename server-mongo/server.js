require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
const databaseName = process.env.MONGO_DATABASE;

const userModel = require("./user.model");

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  mongoose.connect(databaseName, {});
  mongoose.connection
    .once("open", () => {
      console.log("MongoDB connection established");
    })
    .on("error", (err) => {
      console.log("MongoDB connection error : ", err);
    });
});

app.post("/user", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    console.log("Before : ", req.body);
    const newUser = new userModel(req.body);
    console.log("After : ", newUser);
    await newUser
      .save()
      .then((response) => {
        return res.status(201).json({
          message: "New user created",
          result: response,
          success: true,
        });
      })
      .catch((error) => {
        console.log("Server error when creating user");
        res.status(500).json({
          error: error,
          success: false,
        });
      });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

app.get("/users", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    userModel.find().then((users) => {
      if (!users)
        return res.status(404).json({ message: "No users registered yet." });
      return res.status(200).json(users);
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

app.delete("/user", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    console.log("Secret : ", process.env.ADMIN_PASSWORD);
    console.log("Body : ", req.body);
    if (!req.body.password || req.body.password != process.env.ADMIN_PASSWORD)
      return res.status(401).json({ message: "Permission denied." });

    userModel.findByIdAndDelete(req.body.userId).then((user) => {
      if (!user)
        return res
          .status(404)
          .json({ message: "Can't find user with id : " + req.body.userId });
      return res.status(200).json({
        message: "User deleted",
      });
    });
  } catch (error) {}
});
