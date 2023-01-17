const { Sequelize } = require("sequelize");
require('dotenv').config();
const mysql2 = require("mysql2");
const users = require("./users");
const providers = require("./providers");
const commands = require("./commands");

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

users(sequelize);
providers(sequelize);
commands(sequelize);

sequelize
  .sync({
    force: false
  })
  .then(() => {
    console.log("Successfully updated database schema");
  })
  .catch((err) => {
    console.error(err);
    console.log("Failed to update database schema");
  });
