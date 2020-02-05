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
//UPDATE PARTICIPANT
router.post("/updateParticipant", async (req, res) => {
  const { obj, id } = req.body;
  console.log("REQ", req.body);
  const Participant = await Participants.findByIdAndUpdate(id, obj, {
    new: true
  });

  const API_KEY =
    "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";

  sgMail.setApiKey(API_KEY);
  const approved = "Your registration has beed approved by Admin!";
  const declined = "Your registration has beed declined by Admin!";
  const msgDeclined = {
    to: `${req.body.obj.email}`,
    from: "vavasta96@gmail.com",
    subject: "Registration info!!!",
    text: req.body.obj.status === "APPROVED" ? approved : declined
  };

  sgMail.send(msgDeclined);
  res.send(Participant);
});
//ADD USERS //NO API//USE ONLY WITH POSTMAN
router.post("/createUser", async (req, res) => {
  console.log("REQ", req.body);
  let User = new Users(req.body);
  User.save();
  res.send(User);
});

//UPDATE USER
router.post("/updateUser", async (req, res) => {
  const { obj, id } = req.body;
  const user = await Users.findByIdAndUpdate(id, obj, { new: true });
  res.send(user);
});
//SOFT DELETE USER
router.post("/softDeleteUser", async (req, res) => {
  const user = await Users.findOne({ _id: req.body._id });
  user.isDeleted = true;
  user.save();
  res.send(user);
});
//DELETE USER
router.post("/DeleteUser", async (req, res) => {
  console.log("req", req.body);
  const user = await Users.findOneAndDelete({ _id: req.body._id });
  console.log("USER", user);
  res.send(user);
});
//RESTORE USER
router.post("/RestoreUser", async (req, res) => {
  const user = await Users.findOne({ _id: req.body._id });
  user.isDeleted = false;
  user.save();
  res.send(user);
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
