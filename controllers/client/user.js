const User = require('../../models/User');

exports.findUser = (req, res, next) => {
  const user = req.body;
  User.findOne({ username: user.username, password: user.password })
    .then((data) =>
      data
        ? res.json(data)
        : res.status(400).json({ message: 'Wrong username or password' })
    )
    .catch((err) => console.log(err));
};

exports.addUser = (req, res, next) => {
  const user = req.body;
  User.findOne({ username: user.username }).then((data) => {
    if (data) {
      res.status(400).json({ message: 'Your username had been registed' });
    } else {
      User.create({
        username: user.username,
        password: user.password,
        isAdmin: false,
      })
        .then(() => res.json({ message: 'Success' }))
        .catch((err) =>
          res.status(400).json({ message: err._message || err.keyValue })
        );
    }
  });
};
