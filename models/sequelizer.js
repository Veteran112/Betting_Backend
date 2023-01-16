const { DataTypes, Sequelize } = require("sequelize");
require('dotenv').config();
const mysql2 = require("mysql2");
const users = require("./users");
const sequelize = new Sequelize({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.ENDPOINT,
  port: process.env.PORT,
  dialect: "mysql",
  dialectModule: mysql2,
  define: {
    charset: "utf8",
    collate: "utf8_general_ci"
  },
  pool: {
    min: 1,
    max: 2
  }
});

const Users = users(sequelize);

module.exports = {
  sequelize,
  Users
};
