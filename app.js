// index.js
const express = require("express");
const mongoose = require("mongoose");
const studentRouter = require("./routers/StudentRouter");
const marksRouter = require("./routers/MarksRouter");

const app = express();
const port = 8000;

// Replace 'your_mongodb_uri' with your actual MongoDB connection URI
const mongoURI =
  "mongodb+srv://ankitqss:87654321@cluster0.q2uaif0.mongodb.net/track-server?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if MongoDB connection is successful
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Parse JSON bodies for POST and PUT requests
app.use(express.json());

// Use the student router
app.use("/student", studentRouter);
app.use("/marks", marksRouter);

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, Express and MongoDB!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
