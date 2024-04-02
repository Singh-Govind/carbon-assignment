const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  blacklisted: { type: [], default: [] },
});

const TokenModel = mongoose.model("blacklisted", tokenSchema, "blacklisted");

module.exports = TokenModel;
