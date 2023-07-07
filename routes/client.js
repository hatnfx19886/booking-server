const express = require('express');

const {
  findOneHotel,
  couter,
  getTopRate,
} = require('../controllers/client/hotel');
const { search } = require('../controllers/client/search');
const { addTrans, findTrans } = require('../controllers/client/transaction');
const { findUser, addUser } = require('../controllers/client/user');

const routes = express.Router();

routes.get('/hotel/find/:id', findOneHotel);
routes.get('/hotel/couter', couter);
routes.get('/hotel/top-rate', getTopRate);

routes.post('/transaction', addTrans);
routes.get('/transaction/find', findTrans);

routes.post('/user/login', findUser);
routes.post('/user/signup', addUser);

routes.post('/search', search);

module.exports = routes;
