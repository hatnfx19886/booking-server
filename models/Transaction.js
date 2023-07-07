const { Schema, default: mongoose } = require('mongoose');
const Hotel = require('./Hotel');
const Room = require('./Room');
const User = require('./User');

const transactionSchema = new Schema(
  {
    user: String,
    hotel: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
    },
    room: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'Room',
        },
        number: Number,
      },
    ],
    dateStart: Date,
    dateEnd: Date,
    price: Number,
    payment: {
      type: String,
      enum: ['Credit Card', 'Cash'],
    },
    status: {
      type: String,
      enum: ['Booked', 'Checkin', 'Checkout'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
