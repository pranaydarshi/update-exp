const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userController");

//router object
const router = express.Router();

//routers
//post: Login User
router.post("/login", loginController);

//post: Register User
router.post("/register", registerController);
module.exports = router;
