const express = require('express');
const Router = express.Router();

const auth = require('../middlewares/auth');

const user = require('../controllers/user');

Router.post('/login', user.login);

Router.post('/parkingSlots', auth, user.serveParkingSlots);

Router.post('/book', auth, user.bookSlot);

Router.get('/bookHistory', auth, user.bookHistory);


module.exports = Router;