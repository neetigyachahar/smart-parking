const express = require('express');
const Router = express.Router();

const auth = require('../middlewares/auth');

const admin = require('../controllers/admin');

Router.post('/createNewSlot', auth,  admin.createNewSlot);

module.exports = Router;