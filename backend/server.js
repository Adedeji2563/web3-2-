require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Import MongoDB connection
const botRoutes = require("./routes/botRoutes"); // Import bot routes

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Use Routes
app.use("/bots", botRoutes);

// Home Page
app.get("/", (req, res) => {
  res.send("🚀 Server is running! Use /bots/deploy or /bots/stop to manage bots.");
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
