const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");
const cors = require("cors");

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors({ origin: "http://localhost:3000" }));

server.listen(config.PORT, () => {
  mongoose.set("useFindAndModify", false);
  mongoose.connect(config.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  require("./routes/company")(server);
  console.log(`Server started on port ${config.PORT}`);
});
