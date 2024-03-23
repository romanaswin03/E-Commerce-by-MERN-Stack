const express = require('express');
const { registerUser, loginUser, logoutUser, forgotpassword } = require('../controllers/authController');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotpassword);

module.exports = router;