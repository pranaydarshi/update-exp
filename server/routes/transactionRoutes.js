const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/trasactionCtrl");

//router object
const transaction_router = express.Router();

//routers
//Add Transaction POST
transaction_router.post("/add-trasaction", addTransaction);

//Edit Transaction Post
transaction_router.post("/edit-trasaction", editTransaction);

//Delete Transaction Post
transaction_router.post("/delete-trasaction", deleteTransaction);

//Get Transaction GET
transaction_router.post("/get-transaction", getAllTransaction);

module.exports = transaction_router;
