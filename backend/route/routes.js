const express = require("express");
// const nodemailer = require("nodemailer");
const router = express.Router();
const Participants = require("../models/Participants");
const Users = require("../models/Users");
const sgMail = require("@sendgrid/mail");
//ADD PARTICIPANT
router.post("/addParticipant", async (req, res) => {
  let Participant = new Participants(req.body);
  Participant.save();
  const API_KEY =
    "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";

  sgMail.setApiKey(API_KEY);
  const msg = {
    to: `${req.body.email}`,
    from: "vavasta96@gmail.com",
    subject: "Congrats!!!",
    text: "Thank you for registration! See you soon!"
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msg);
});

//ADD USERS //NO API//USE ONLY WITH POSTMAN
router.post("/addUser", async (req, res) => {
  let EmailAndPass = req.body;
  if (EmailAndPass.email === "vavasta96@gmail.com") {
    EmailAndPass = { ...EmailAndPass, isSuperAdmin: true };
  } else if (EmailAndPass.email === "admin@gmail.com") {
    EmailAndPass = { ...EmailAndPass, isAdmin: true };
  }
  let User = new Users(EmailAndPass);
  User.save();
  res.send(User);
});

//LOGIN
router.post("/login", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  const error = "Error";
  if (user) {
    res.send(user);
  } else {
    res.send(error);
  }
});

router.get("/getUsers", async (req, res) => {
  const getUsers = await Users.find();
  res.json({ success: true, getUsers: getUsers });
});

router.get("/getParticipants", async (req, res) => {
  const getParticipants = await Participants.find();
  res.json({ success: true, getParticipants: getParticipants });
});
module.exports = router;
