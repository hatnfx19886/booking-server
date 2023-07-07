const User = require('../../models/User');

exports.login = (req, res, next) => {
  User.findOne({
    username: req.body.username,
    password: req.body.password,
  })
    .then((data) => {
      if (data) {
        if (data.isAdmin) {
          res.json(data._id);
        } else res.status(400).json({ message: 'Your account is not Admin!' });
      } else res.status(400).json({ message: 'Wrong username or password' });
    })
    .catch((err) => console.log(err));
};

exports.check = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((data) => {
      if (!data || !data.isAdmin) {
        res.status(401).json({ message: 'Unauthorized' });
      } else res.json({ message: 'Auth' });
    })
    .catch((err) => console.log(err));
};
