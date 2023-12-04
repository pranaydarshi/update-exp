const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const connectDb = require("./config/connectDb.js");
const router = require("./routes/userroutes.js");
const transaction_router = require("./routes/transactionRoutes.js");
const path = require("path");

const dotenv = require("dotenv");
const colors = require("colors");
const app = express();

// Load environment variables first
dotenv.config();

// Connect Database
connectDb();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/users", router);
app.use("/api/v1/transaction", transaction_router);

//Static files
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
// Routes
app.get("/", (req, res) => {
  res.send("<h1>Hello Pranay</h1>");
});
// Port
const PORT = process.env.PORT || 2002;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
