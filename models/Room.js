const { Schema, default: mongoose } = require('mongoose');

const roomSchema = new Schema(
  {
    title: String,
    price: Number,
    maxPeople: Number,
    desc: String,
    roomNumbers: [Number],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);
