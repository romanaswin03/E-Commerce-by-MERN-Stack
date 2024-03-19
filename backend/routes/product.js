const epxress = require('express');
const { getProducts } = require('../controllers/productController');
const router = epxress.Router();

router.route('/products').get(getProducts);

module.exports = router