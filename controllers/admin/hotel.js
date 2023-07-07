const Hotel = require('../../models/Hotel');
const Transaction = require('../../models/Transaction');

exports.getAllHotel = (req, res, next) => {
  Hotel.find()
    .sort({ updatedAt: -1 })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};

exports.addHotel = (req, res, next) => {
  const hotel = {
    name: req.body.name,
    type: req.body.type,
    city: req.body.city,
    address: req.body.address,
    distance: req.body.distance,
    photos: req.body.photos,
    desc: req.body.desc,
    cheapestPrice: req.body.cheapestPrice,
    title: req.body.title,
    rating: req.body.rating,
    featured: req.body.featured,
    rooms: req.body.rooms,
  };
  const id = req.body.id;
  id
    ? Hotel.findOneAndUpdate({ _id: id }, hotel)
        .then(() => res.json({ message: 'Success' }))
        .catch((err) => res.status(400).json({ message: err.message }))
    : Hotel.create(hotel)
        .then(() => res.json({ message: 'Success' }))
        .catch((err) => res.status(400).json({ message: err.message }));
};

exports.findHotel = (req, res, next) => {
  Hotel.findOne({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};

exports.deleteHotel = (req, res, next) => {
  const hotelId = req.params.id;
  Transaction.findOne({ hotel: hotelId })
    .then((data) => {
      if (data) {
        res.status(400).json({ message: 'This Hotel is in a transaction' });
      } else {
        Hotel.findOneAndDelete({ _id: hotelId })
          .then(() => res.json({ message: 'Success' }))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};
