const { Histories } = require("../models/sequelizer");

const Controller = {
  async getList(req, res) {
    try {
      var user_id = req.params.id;

      var where = {};

      where = {
        user_id
      };

      var data = await Histories.findAll({ where });
      res.send(data);
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  }
};

module.exports = Controller;
