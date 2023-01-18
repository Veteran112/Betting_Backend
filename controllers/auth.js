const { Users } = require("../models/sequelizer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

const Controller = {
  async signIn(req, res) {
    try {
      var { email, password } = req.body;

      if (!email || !password)
        return res.status(400).send({ error: "Not all fields has filled" });

      password = crypto
        .createHmac("sha256", process.env.PASSWORD_HASH)
        .update(password)
        .digest("hex");

      var user = await Users.findOne({
        where: {
          email,
          password
        },attributes: { exclude: ["password"] }
      });
      if (!user)
        return res
          .status(404)
          .send({ error: "User with this email and password not found" });

      var token = jwt.sign({ id: user._id }, process.env.JWT_HASH);
      res.send({ token, user });
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  },

  async signUp(req, res) {
    try {
      var { fname, lname, email, password } = req.body;

      if (!email || !fname || !lname || !password)
        return res.status(422).send({ error: "Not all fields has filled" });

      password = crypto
        .createHmac("sha256", process.env.PASSWORD_HASH)
        .update(password)
        .digest("hex");

      var user_exist = await Users.count({
        where: {
          email
        }
      });
      if (user_exist && user_exist > 0)
        return res.status(404).send({ error: "User already exist" });
      let block = false;
      var user = await Users.create({
        fname,
        lname,
        email,
        password,
        block
      });

      var token = jwt.sign({ id: user._id }, process.env.JWT_HASH);
      res.send({ token, user });
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  }
};

module.exports = Controller;
