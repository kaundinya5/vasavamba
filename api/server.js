const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./DB.js");
const vasavambaRoute = require("./vasavamba.route");

mongoose.Promise = global.Promise;
var connectWithRetry = function() {
  return mongoose
    .connect(config.DB, {
      useNewUrlParser: true,
      reconnectTries: 10,
      autoReconnect: true
    })
    .then(
      () => {
        console.log("Database is connected");
      },
      err => {
        console.log("Can not connect to the database" + err);
        setTimeout(connectWithRetry, 10000);
      }
    );
};
connectWithRetry();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/vasavamba", vasavambaRoute);

app.listen(PORT, function() {
  console.log("Server is running on Port:", PORT);
});
