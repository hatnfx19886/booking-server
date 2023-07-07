const Hotel = require('../../models/Hotel');
const Room = require('../../models/Room');
const Transaction = require('../../models/Transaction');

exports.getAllRoom = (req, res, next) => {
  Room.find()
    .sort({ updatedAt: -1 })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};

exports.findRoom = (req, res, next) => {
  Room.findOne({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};

exports.addRoom = (req, res, next) => {
  const room = {
    title: req.body.title,
    price: req.body.price,
    maxPeople: req.body.maxPeople,
    desc: req.body.desc,
    roomNumbers: req.body.roomNumbers,
  };
  const hotels = req.body.hotels;
  const id = req.body.id;
  id
    ? Room.findOneAndUpdate({ _id: id }, room)
        .then(() => res.json({ message: 'Success' }))
        .catch((err) => res.status(400).json({ message: err.message }))
    : Room.create(room)
        .then((data) => {
          Hotel.updateMany(
            { _id: { $in: hotels } },
            { $push: { rooms: data._id.toJSON() } }
          )
            .then(() => res.json({ message: 'Success' }))
            .catch((err) => console.log(err));
        })
        .catch((err) => res.status(400).json({ message: err.message }));
};

exports.deleteRoom = (req, res, next) => {
  const roomId = req.params.id;
  Transaction.findOne({ 'room._id': roomId })
    .then((data) => {
      if (data) {
        res.status(400).json({ message: 'This Room is in a transaction' });
      } else {
        Room.findOneAndDelete({ _id: roomId })
          .then(() => res.json({ message: 'Success' }))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};
