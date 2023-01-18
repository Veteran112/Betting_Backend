const { Bets } = require("../models/sequelizer");

const Controller = {
  async getList(req, res) {
    try {
      var data = await Bets.findAll();
      res.send(data);
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  }
};

module.exports = Controller;
