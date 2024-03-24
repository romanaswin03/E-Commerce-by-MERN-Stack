const express = require('express');
const { newOrder, getSingleOrder } = require('../controllers/orderController');
const { isAuthenticateUser } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/order/new').post(isAuthenticateUser, newOrder);
router.route('/order/:id').get(isAuthenticateUser, getSingleOrder);

module.exports = router;