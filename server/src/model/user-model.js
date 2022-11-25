const mongoose = require("mongoose");
const SupplierSchema = new mongoose.Schema({
  // **General informations
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  // **contact informations
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  // ** History informations
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: null,
  },
});

const Supplier = mongoose.model("user", SupplierSchema);
module.exports = Supplier;
