const transactionModel = require("../models/transactionModel");
const moment = require("moment");
const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectdate, type } = req.body;
    const transaction = await transactionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : { date: { $gte: selectdate[0], $lte: selectdate[1] } }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Created");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const editTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.status(200).send("Edit Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId });
    res.send("Delete Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
