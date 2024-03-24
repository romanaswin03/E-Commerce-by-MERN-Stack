const express = require('express');
const { registerUser, loginUser, logoutUser,
    forgotpassword, resetPassword, getUserProfile,
     changePassword,
     updateProfile} = require('../controllers/authController');
const router = express.Router();
const {isAuthenticateUser} = require('../middlewares/authenticate');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotpassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/myprofile').get(isAuthenticateUser, getUserProfile);
router.route('/password/change').put(isAuthenticateUser, changePassword)
router.route('/update').put(isAuthenticateUser, updateProfile)

module.exports = router;