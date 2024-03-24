const express = require('express');
const { newOrder, getSingleOrder, myOders, orders, updateOrder } = require('../controllers/orderController');
const { isAuthenticateUser, authorizedRoles } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/order/new').post(isAuthenticateUser, newOrder);
router.route('/order/:id').get(isAuthenticateUser, getSingleOrder);
router.route('/myOrders').get(isAuthenticateUser, myOders);

//Admin routes
router.route('/orders').get(isAuthenticateUser, authorizedRoles('admin'), orders);
router.route('/order/:id').put(isAuthenticateUser, authorizedRoles('admin'), updateOrder);

module.exports = router;