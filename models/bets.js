const { DataTypes, Sequelize } = require("sequelize");
const { v4 } = require("uuid");

module.exports = (sequelize) => {
  return sequelize.define(
    "tbl_bets",
    {
      _id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: v4
      },
      percent: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      date_created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      event: {
        type: DataTypes.STRING,
        allowNull: false
      },
      books: {
        type: DataTypes.STRING,
        allowNull: false
      },
      market: {
        type: DataTypes.STRING,
        allowNull: false
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
