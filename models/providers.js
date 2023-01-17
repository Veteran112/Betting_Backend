const { DataTypes, Sequelize } = require("sequelize");
const { v4 } = require("uuid");

module.exports = (sequelize) => {
  return sequelize.define(
    "tbl_providers",
    {
      _id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: v4
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Name"
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date_create: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
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
