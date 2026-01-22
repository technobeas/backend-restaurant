const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/userLogin');
const { isLoggedIn } = require('../middlewares/isLoggedIn');

router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
