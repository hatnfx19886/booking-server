const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const clientRouter = require('./routes/client');
const adminRouter = require('./routes/admin');
const uri =
  'mongodb+srv://admin_01:hatnfx19886@cluster0.cb4rzj3.mongodb.net/booking?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);

const app = express();
app.use(bodyParser.json({ type: 'application/json' }));

const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

// const store = new MongoDBStore({
//   uri,
//   collection: 'sessions',
// });

// app.use(
//   session({
//     secret: 'hatnfx19886',
//     resave: false,
//     saveUninitialized: false,
//     store,
//   })
// );

app.use(clientRouter);
app.use('/admin', adminRouter);
app.use('*', (req, res, next) =>
  res.status(404).json({ message: 'Route not found' })
);

mongoose
  .connect(uri)
  .then(() => app.listen(5000))
  .catch((err) => console.log(err));
