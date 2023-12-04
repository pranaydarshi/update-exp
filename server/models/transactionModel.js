const mongoose = require("mongoose");
const transactionSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
    },
    descripton: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timeStamps: true }
);
const transactionModel = mongoose.model("transaction", transactionSchema);
module.exports = transactionModel;
