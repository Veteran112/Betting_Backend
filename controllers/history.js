const { Histories } = require("../models/sequelizer");

const Controller = {
  async getList(req, res) {
    try {
      var data = await Histories.findAll();
      res.send(data);
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  }
};

module.exports = Controller;
