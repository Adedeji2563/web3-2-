const mongoose = require("mongoose");

const BotSchema = new mongoose.Schema({
  token: { type: String, required: true },
  script: { type: String, required: true },
  status: { type: String, default: "running" }, // Track bot status
});

module.exports = mongoose.model("Bot", BotSchema);
