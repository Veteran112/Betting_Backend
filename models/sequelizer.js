const { DataTypes, Sequelize } = require("sequelize");
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

const Users = users(sequelize);
const Providers = providers(sequelize);
const Commands = commands(sequelize);

Providers.belongsTo(Users, {
  targetKey: "_id",
  foreignKey: "user_id",
  as: "creater"
});
Commands.belongsTo(Providers, {
  targetKey: "_id",
  foreignKey: "provider_id",
  as: "command"
});
Users.hasMany(Providers, {
  sourceKey: "_id",
  foreignKey: "user_id",
  as: "provider"
});
Providers.hasMany(Commands, {
  sourceKey: "_id",
  foreignKey: "provider_id",
  as: "events"
});

module.exports = {
  sequelize,
  Users,
  Providers,
  Commands
};
