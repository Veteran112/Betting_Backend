const { DataTypes, Sequelize } = require("sequelize");
const { v4 } = require("uuid");

module.exports = (sequelize) => {
  return sequelize.define(
    "tbl_users",
    {
      _id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: v4
      },
      fname: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "FirstName"
      },
      lname: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "LastName"
      },
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      block: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      date_create: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      user_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      admin_id: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,

      // If don't want createdAt
      createdAt: false,

      // If don't want updatedAt
      updatedAt: false
    }
  );
};
