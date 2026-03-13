const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


/* =========================
   SIGNUP API
========================= */

router.post("/signup", async (req, res) => {

 try {

  const { name, email, password } = req.body;

  /* check existing user */

  const existingUser = await User.findOne({ email });

  if (existingUser) {
   return res.status(400).json({
    message: "User already exists"
   });
  }

  /* hash password */

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
   name,
   email,
   password: hashedPassword
  });

  await user.save();

  res.json({
   message: "User Registered Successfully"
  });

 } catch (err) {

  res.status(500).json({
   error: err.message
  });

 }

});


/* =========================
   LOGIN API
========================= */

router.post("/login", async (req, res) => {

 try {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
   return res.status(400).json({
    message: "User not found"
   });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
   return res.status(400).json({
    message: "Invalid password"
   });
  }

  /* create JWT token */

  const token = jwt.sign(
   { id: user._id, role: user.role },
   "secretkey",
   { expiresIn: "7d" }
  );

  res.json({
   message: "Login successful",
   token,
   role: user.role
  });

 } catch (err) {

  res.status(500).json({
   error: err.message
  });

 }

});


module.exports = router;