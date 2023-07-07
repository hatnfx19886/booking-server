const { Schema, default: mongoose } = require('mongoose');
const Room = require('./Room');

const hotelSchema = new Schema(
  {
    name: String,
    type: {
      type: String,
      enum: ['hotel', 'apartments', 'resorts', 'villas', 'cabins'],
      lowercase: true,
    },
    city: String,
    address: String,
    distance: String,
    photos: [String],
    desc: String,
    cheapestPrice: Number,
    title: String,
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    featured: Boolean,
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Room',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hotel', hotelSchema);
