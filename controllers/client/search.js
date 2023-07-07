const Hotel = require('../../models/Hotel');
const Transaction = require('../../models/Transaction');

exports.search = (req, res, next) => {
  const filter = req.body.city ? { city: req.body.city } : {};
  Hotel.find(filter)
    .populate('rooms')
    .then((hotels) => {
      const hotelIds = hotels.map((x) => x._id);
      Transaction.find({
        hotel: { $in: hotelIds },
        dateStart: { $lte: new Date(req.body.endDate) },
        dateEnd: { $gte: new Date(req.body.startDate) },
      }).then((data) =>
        res.json({
          hotels: hotels,
          trans: data,
        })
      );
    })
    .catch((err) => console.log(err));
};
