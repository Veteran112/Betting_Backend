
const {
  Providers
} = require("../models/sequelizer");

const Controller = {
  async getOneProvider(req, res) {
    try {
      var user_id = req.params.id;

      var where = {};

      where = {
        user_id
      };

      var providers = await Providers.findAll({ where });
      
      if (!providers) return res.status(404).send({ error: "Provider not found" });

      res.send({ providers });
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  },
  async createProvider(req, res) {
		try {
			var { user_id, name, url } = req.body;

			if (!user_id || !name || !url)
				return res.status(422).send({error: "Not all fields has filled"});

			var provider = await Providers.create({
				user_id, name, url
			});
      res.send({ message: "Created Provider" });
		}
		catch(error) {
			res.status(500).send({error: "Server error"});
		}
	},

  async updateProvider(req, res) {
    try {
      var { user_id, name, url } = req.body;
      var set = {};

      if (user_id !== undefined) set.user_id = user_id;
      if (name !== undefined) set.name = name;
      if (url !== undefined) set.url = url;

      var update = await Providers.update(set, {
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
  
  async deleteProvider(req, res) {
    try {
      var _id = req.params.id;

      var provider = await Providers.findOne({
        where: { _id }
      });
      if (!provider) return res.status(404).send({ error: "Provider not found" });

      await Providers.destroy({
        where: { _id }
      });

      res.send({ message: "Provider success deleted" });
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  },
};

module.exports = Controller;
