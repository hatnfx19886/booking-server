const Hotel = require('../../models/Hotel');

exports.findOneHotel = (req, res, next) => {
  Hotel.findOne({ _id: req.params.id })
    .populate('rooms')
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};

exports.couter = (req, res, next) => {
  const key = req.query.key;
  Hotel.find()
    .then((data) => {
      if (key === 'city') {
        const cityProp = {
          hanoi: data.filter((x) => x.city === 'Ha Noi').length,
          hcm: data.filter((x) => x.city === 'Ho Chi Minh').length,
          danang: data.filter((x) => x.city === 'Da Nang').length,
        };
        res.json(cityProp);
      } else if (key === 'type') {
        const typeProp = {
          hotels: data.filter((x) => x.type === 'hotel').length,
          apartments: data.filter((x) => x.type === 'apartment').length,
          resorts: data.filter((x) => x.type === 'resort').length,
          villas: data.filter((x) => x.type === 'villa').length,
          cabins: data.filter((x) => x.type === 'cabin').length,
        };
        res.json(typeProp);
      } else res.status(400).json({ message: 'Unknown key value' });
    })
    .catch((err) => console.log(err));
};

exports.getTopRate = (req, res, next) => {
  Hotel.find()
    .sort({ rating: -1 })
    .limit(3)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};
