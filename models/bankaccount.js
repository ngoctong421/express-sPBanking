const mongoose = require('mongoose');

const bankAccountSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  bank: { type: String, required: true },
  name: { type: String, required: true },
  cardnumber: { type: String, required: true, unique: true },
  cardnumbersliced: { type: String },
  validfrom: { type: String, required: true },
  account: { type: String, required: true },
  balance: { type: Number, required: true },
  connected: { type: Number, required: true },
});

module.exports = mongoose.model('BankAccount', bankAccountSchema);
