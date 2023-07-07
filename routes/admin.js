const express = require('express');

const {
  addHotel,
  deleteHotel,
  getAllHotel,
  findHotel,
} = require('../controllers/admin/hotel');
const {
  addRoom,
  deleteRoom,
  getAllRoom,
  findRoom,
} = require('../controllers/admin/room');
const { dashboard, getAllTrans } = require('../controllers/admin/transaction');
const { login, check } = require('../controllers/admin/user');

const routes = express.Router();

routes.get('/', dashboard);

routes.get('/hotel', getAllHotel);
routes.post('/hotel', addHotel);
routes.get('/hotel/find/:id', findHotel);
routes.get('/hotel/delete/:id', deleteHotel);

routes.get('/room', getAllRoom);
routes.post('/room', addRoom);
routes.get('/room/find/:id', findRoom);
routes.get('/room/delete/:id', deleteRoom);

routes.get('/user/find/:id', check);
routes.post('/user/login', login);
routes.get('/transaction', getAllTrans);

module.exports = routes;
