var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const auth = require("../middleware/auth");
const getToken = require("../middleware/get_token")

/* GET users listing. */
router.post("/register", async (req, res, next) => {
  try {
    const { first_name, last_name, username, password } = req.body;


    if (!(first_name && last_name && username && password)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.find({ username });
    if (oldUser.length > 0) {
      return res.status(409).send("User already exist. Please login");
    }
    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      username,
      password: encryptedPassword,
    });

    //create token
    //save user token
    user.token = getToken(user,username,"2h");

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    //get user
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      user.token = getToken(user,username,"2h");
      res.status(200).json(user);
    }

    res.status(500).send("invalid credentials");
  } catch (error) {
    console.log(error);
  }
});

router.post("/checkaut", auth, (req, res, next) => {
  res.status(200).send({
    message: "get success",
    success: true,
  });
});

module.exports = router;
