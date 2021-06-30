const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  /*
  id: {
    type: Number,
    required: true,
    unique: true
  },
  */
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
})

const Itemdb = mongoose.model('itemdb', schema);

module.exports = Itemdb;