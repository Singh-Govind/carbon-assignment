const axios = require("axios");
const Api = {};

Api.retrive = async (req, res) => {
  try {
    let { category } = req.query;

    let url = `https://api.publicapis.org/entries?limit=10`;

    if (category) {
      url = `https://api.publicapis.org/entries?category=${category}`;
    }
    let results = await axios.get(url);
    res.json({ results: results.data });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, msg: "something went wrong", err: e.message });
  }
};

module.exports = Api;
