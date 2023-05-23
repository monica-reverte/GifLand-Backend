const express = require('express');
const { auth0Login } = require('../controllers/userController');

const router = express.Router();


router.post('/auth0login', auth0Login);


module.exports = router;