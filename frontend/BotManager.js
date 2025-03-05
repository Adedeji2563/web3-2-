import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = "https://web3-obgn.onrender.com"; // Set your backend URL

const BotManager = () => {
  const [token, setToken] = useState("");
  const [script, setScript] = useState("");
  const [message, setMessage] = useState("");

  // Deploy Bot
  const deployBot = async () => {
    if (!token || !script) {
      setMessage("❌ Please enter a bot token and script file.");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/bots/deploy`, { token, script });
      setMessage(`✅ ${response.data}`);
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data || "Failed to deploy bot"}`);
    }
  };

  // Stop Bot
  const stopBot = async () => {
    if (!token) {
      setMessage("❌ Please enter a bot token to stop.");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/bots/stop`, { token });
      setMessage(`✅ ${response.data}`);
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data || "Failed to stop bot"}`);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
      <h2>🚀 Bot Management</h2>
      <input 
        type="text" 
        placeholder="Enter Bot Token" 
        value={token} 
        onChange={(e) => setToken(e.target.value)} 
        style={{ width: "100%", padding: "8px", margin: "10px 0" }}
      />
      <input 
        type="text" 
        placeholder="Enter Script Path (e.g., bot.js)" 
        value={script} 
        onChange={(e) => setScript(e.target.value)} 
        style={{ width: "100%", padding: "8px", margin: "10px 0" }}
      />
      <button onClick={deployBot} style={{ padding: "10px", margin: "5px", background: "green", color: "white" }}>
        ➕ Deploy Bot
      </button>
      <button onClick={stopBot} style={{ padding: "10px", margin: "5px", background: "red", color: "white" }}>
        ⛔ Stop Bot
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BotManager;
