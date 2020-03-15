const express = require("express");
const mongoose = require("mongoose");
const routes = require("./route/routes");
const dotenv = require("dotenv");

dotenv.config();
var cors = require("cors");

const API_PORT = 4000;
const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();
const bodyParser = require("body-parser");
const dbRoute = process.env.dbRoute;

mongoose.connect(dbRoute, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});
let db = mongoose.connection;
db.once("open", () => console.log("connected to DB"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);
app.use("/api", router);
app.listen(API_PORT, () => console.log("object"));
