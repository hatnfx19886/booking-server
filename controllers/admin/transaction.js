const Transaction = require('../../models/Transaction');

exports.dashboard = (req, res, next) => {
  Transaction.find()
    .populate('hotel')
    .sort({ createdAt: -1 })
    .limit(8)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};

exports.getAllTrans = (req, res, next) => {
  Transaction.find()
    .populate('hotel')
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};
