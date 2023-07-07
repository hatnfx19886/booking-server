const Transaction = require('../../models/Transaction');
const User = require('../../models/User');

exports.addTrans = (req, res, next) => {
  const transaction = req.body.transaction;
  const user = req.body.user;
  User.findOneAndUpdate(
    { username: user.username },
    {
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      cardNumber: user.cardNumber,
    }
  )
    .then(() => {
      Transaction.create({
        user: transaction.user,
        hotel: transaction.hotel,
        room: transaction.room,
        dateStart: transaction.dateStart,
        dateEnd: transaction.dateEnd,
        price: transaction.price,
        payment: transaction.payment,
        status: transaction.status,
        createAt: new Date(),
      })
        .then(() => res.json({ message: 'Success' }))
        .catch((err) => res.status(400).json({ message: err._message }));
    })
    .catch((err) => console.log(err));
};

exports.findTrans = (req, res, next) => {
  const key = req.query.key;
  const value = req.query.value;
  let filter;
  if (key === 'hotel') {
    filter = {
      hotel: value,
    };
  } else if (key === 'user') {
    filter = {
      user: value,
    };
  } else {
    res.status(400).json({ message: 'Unknown key' });
  }
  if (filter) {
    Transaction.find(filter)
      .populate('hotel')
      .then((data) => res.json(data))
      .catch((err) => console.log(err));
  }
};
