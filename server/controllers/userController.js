const userModel = require("../models/usermodel.js");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("User Not Exist");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ success: false, error });
  }
};
const registerController = async (req, res) => {
  // const { name, email, password } = req.body;
  // userModel({ name, email, password }).save();
  try {
    const { name, email, password } = req.body;
    userModel({ name, email, password }).save();
    res.status(200).send("Data Recieved");
  } catch (err) {
    res.send(err);
  }
};

module.exports = { loginController, registerController };
