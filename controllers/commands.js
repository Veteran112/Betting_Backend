const { Commands } = require("../models/sequelizer");

const Controller = {
  async getOneProvider(req, res) {
    try {
      var provider_id = req.params.id;

      var where = {};

      where = {
        provider_id
      };

      var commands = await Commands.findAll({ where });

      if (!commands)
        return res.status(404).send({ error: "Command not found" });

      res.send({ commands });
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  },
  async createCommand(req, res) {
    try {
      var { provider_id, step, command } = req.body;

      if (!provider_id || !step || !command)
        return res.status(422).send({ error: "Not all fields has filled" });

      var command = await Commands.create({
        provider_id,
        step,
        command,
        screen: ""
      });
      res.send({ message: "Created Command" });
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  },

  async updateCommand(req, res) {
    try {
      var { step, command } = req.body;
      var set = {};

      if (step !== undefined) set.step = step;
      if (command !== undefined) set.command = command;
      if (req.files && req.files.avatar) {
        set.screen = await helpers.uploadFile(
          req.files.avatar,
          req.params.id + req.files.avatar.name,
          "content/screens"
        );
      }
      var update = await Commands.update(set, {
        where: {
          _id: req.params.id
        }
      });
      if (!update || update === [0])
        return res.status(422).send({ error: "Nothing was updated" });

      res.send({ message: "Command updated" });
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  },

  async deleteCommand(req, res) {
    try {
      var _id = req.params.id;

      var command = await Commands.findOne({
        where: { _id }
      });
      if (!command) return res.status(404).send({ error: "Command not found" });

      await Commands.destroy({
        where: { _id }
      });

      res.send({ message: "Command success deleted" });
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  }
};

module.exports = Controller;
