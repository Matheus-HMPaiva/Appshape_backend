// models/User.js
const mongoose = require('mongoose');

const imcSchema = new mongoose.Schema({
  height: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  weight: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Imc', imcSchema);
