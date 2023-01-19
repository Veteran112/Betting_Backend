const { Bets } = require("../models/sequelizer");

const Controller = {
  async getList(req, res) {
    try {
      var data = await Bets.findAll();
      res.send(data);
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  },
  async getOneBet(req, res) {
    try {
      var bet_id = req.params.id;

      var where = {};

      where = {
        _id: bet_id
      };

      var bet = await Bets.findOne({
        where
      });

      if (!bet) return res.status(404).send({ error: "Bet not found" });

      res.send({ bet });
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  }
};

module.exports = Controller;
