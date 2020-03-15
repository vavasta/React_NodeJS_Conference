const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParticipantsSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true
    },
    firstname: String,
    lastname: String,
    companyname: String,
    dateofarrivalanddeparture: Array,
    position: String,
    gender: String,
    role: String,
    dateOfBirth: Number,
    country: String,
    status: String
  },
  { collection: "participants" }
);
module.exports = mongoose.model(
  "Participants",
  ParticipantsSchema,
  "participants"
);
