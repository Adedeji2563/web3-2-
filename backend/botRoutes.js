const express = require("express");
const router = express.Router();
const Bot = require("../models/Bot");
const { exec } = require("child_process");

// Deploy Bot
router.post("/deploy", async (req, res) => {
  const { token, script } = req.body;

  if (!token || !script) {
    return res.status(400).json({ error: "Missing token or script" });
  }

  const bot = new Bot({ token, script });
  await bot.save();

  exec(`pm2 start ${script} --name bot-${token}`, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to start bot" });
    }
    res.json({ message: "✅ Bot deployed successfully!" });
  });
});

// Stop Bot
router.post("/stop", async (req, res) => {
  const { token } = req.body;

  exec(`pm2 stop bot-${token}`, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to stop bot" });
    }
    res.json({ message: "✅ Bot stopped successfully!" });
  });
});

// Get all bots
router.get("/", async (req, res) => {
  const bots = await Bot.find();
  res.json(bots);
});

module.exports = router;
