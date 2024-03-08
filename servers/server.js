const mysql = require("mysql2");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
dotenv.config();

const connection = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
  })
  .promise();

/**
 * @description Get All user
 * @route GET /users
 */
const getAllUsers = {
  async function(req, res, next) {
    let sql = "SELECT * from user";
    const { rows } = await createPool.query(sql);
    if (!rows.length) return res.status(204).json({ message: "empty list" });

    return res.status(200).json({ users: rows });
  },
};

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

connection.query("SELECT * from user", function (err, results) {
  if (err) throw err;
  console.log("Nb users:", results.length);
});

connection.end();
