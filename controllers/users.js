const { Op, Sequelize } = require("sequelize");
const crypto = require("crypto");
const { Users } = require("../models/sequelizer");
const helpers = require("../helpers");
const axios = require("axios");

const Controller = {
  async searchUser(req, res) {
    try {
      if (!Object.keys(req.body).length)
        return res.status(422).send({ error: "No one search params" });

      var { fname, lname, email } = req.body;

      var where = {};

      if (fname)
        where.fname = {
          [Op.regexp]: fname
        };
      if (lname)
        where.lname = {
          [Op.regexp]: lname
        };
      if (email)
        where.email = {
          [Op.regexp]: email
        };
      var paginator_data = await helpers.paginator(
        req.query.page,
        { where },
        Users
      );
      var pagination = paginator_data.info;

      var users = await Users.findAll({
        where,
        limit: 20,
        skip: paginator_data.skip,
        order: [["date_create", "DESC"]]
      });

      res.send({ users, ...pagination });
    } catch (error) {
      console.log("Users search error", error);
      res.status(500).send({ error: "Server error" });
    }
  },
  async getOneUser(req, res) {
    try {
      var user_id = req.params.id;

      var where = {};

      where = {
        _id: user_id
      };

      var user = await Users.findOne({
        where,
        attributes: { exclude: ["password"] }
      });

      if (!user) return res.status(404).send({ error: "User not found" });

      res.send({ user });
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  },
  async createUser(req, res) {
    try {
      var { fname, lname, email, password, admin_id } = req.body;
      console.log(req.body);

      if (!email || !fname || !lname || !password)
        return res.status(422).send({ error: "Not all fields has filled" });

      password = crypto
        .createHmac("sha256", process.env.PASSWORD_HASH)
        .update(password)
        .digest("hex");

      var user_exist = await Users.count({
        where: {
          email,
          user_type: "admin"
        }
      });
      if (user_exist && user_exist > 0)
        return res.status(404).send({ error: "User already exist" });
      let block = false;
      let user_type = "user";
      var user = await Users.create({
        fname,
        lname,
        email,
        password,
        block,
        user_type,
        admin_id
      });
      var users = await Users.findAll({
        attributes: { exclude: ["password"] }
      });
      res.send(users);
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  },
  async getList(req, res) {
    try {
      var admin_id = req.params.id;
      var where = {};
      where = {
        [Op.or]: [{ _id: admin_id }, { admin_id }]
      };

      var users = await Users.findAll({
        where,
        attributes: { exclude: ["password"] }
      });
      res.send(users);
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  },
  async updateUserSettings(req, res) {
    try {
      var _id = req.params.id;
      var { fname, lname, email, password } = req.body;
      var set = {};

      if (fname !== undefined) set.fname = fname;
      if (lname !== undefined) set.lname = lname;
      if (email !== undefined) set.email = email;
      if (password !== undefined)
        set.password = crypto
          .createHmac("sha256", process.env.PASSWORD_HASH)
          .update(password)
          .digest("hex");

      var update = await Users.update(set, {
        where: {
          _id
        }
      });
      if (!update || update === [0])
        return res.status(422).send({ error: "Nothing was updated" });

      res.send({ message: "Settings updated" });
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  },
  async blockUser(req, res) {
    try {
      var { id, action } = req.body;
      await Users.update(
        { block: action },
        {
          where: { _id: id }
        }
      );
      res.status(200).send({ success: true });
    } catch (error) {
      res.status(500).send({ error });
    }
  },
  async deleteUser(req, res) {
    try {
      var _id = req.params.id;

      var user = await Users.findOne({
        where: { _id }
      });
      if (!user) return res.status(404).send({ error: "User not found" });

      await Users.destroy({
        where: { _id }
      });

      res.send({ message: "User success deleted" });
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  },
  async sentEmail(req, res) {
    try {
      const {
        webform_submit_catch,
        sf_catch,
        em_wfs_formfield_7146138,
        em_wfs_consent_text,
        em_wfs_formfield_7146139
      } = req.body;

      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        "Access-Control-Allow-Credentials": true
      };

      axios
        .post(
          "https://www.vision6.com.au/em/forms/subscribe.php?db=804202&s=690673&a=49629&k=a3cUsXjW1fnmTbyhvfZlMOqhguLIM01Px6xS7hsUZk8&va=5",
          {
            webform_submit_catch,
            sf_catch,
            em_wfs_formfield_7146138,
            em_wfs_consent_text,
            em_wfs_formfield_7146139
          },
          {
            headers: headers
          }
        )
        .then((result) => {
          console.log("result", result.status);
          res.status(200).send({ success: result.status });
        })
        .catch((err) => {
          res.status(500).send({ err });
        });
    } catch (error) {
      res.status(500).send({ error });
    }
  }
};

module.exports = Controller;
