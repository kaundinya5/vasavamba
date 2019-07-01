const express = require("express");
const vasavambaRoutes = express.Router();

// Require Business model in our routes module
let Vasavamba = require("./vasavamba.model");

// Defined store route
vasavambaRoutes.route("/add_csv").post(function(req, res) {
  const csv = require("csvtojson");
  const csvFilePath = "data.csv";
  csv()
    .fromFile(csvFilePath)
    .then(jsonObj => {
      jsonObj.forEach(function(item) {
        const lowerObj = Object.fromEntries(
          Object.entries(item).map(([k, v]) => [k.toLowerCase(), v])
        );
        let vasavamba = new Vasavamba(lowerObj);
        vasavamba.save();
      });
    });
  res.json("Successfully added entries");
});

// Defined get data(index or listing) route
vasavambaRoutes.route("/get_all").get(function(req, res) {
  Vasavamba.find(function(err, items) {
    if (err) {
      console.log(err);
    } else {
      res.json(items);
    }
  });
});
// Defined delete | remove | destroy route
vasavambaRoutes.route("/delete/:id").get(function(req, res) {
  Vasavamba.findByIdAndRemove({ _id: req.params.id }, function(err, business) {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});
vasavambaRoutes.route("/delete_all").get(function(req, res) {
  Vasavamba.db.db.dropDatabase(function(err, delOK) {
    if (err) throw err;
    if (delOK) {
      console.log("Collection deleted");
      res.json("Successfully deleted");
    }
  });
});
module.exports = vasavambaRoutes;
