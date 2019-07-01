const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Vasamba = new Schema({
  category: {
    type: String
  },
  item: {
    type: String
  },
  weight: {
    type: String
  },
  units: {
    type: String
  },
  quantity: {
    type: String
  },
  price: {
    type: String
  },
  shelf_No: {
    type: String
  }
});
module.exports = mongoose.model("Vasamba", Vasamba);
