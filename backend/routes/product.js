const epxress = require('express');
const { getProducts, newProduct } = require('../controllers/productController');
const router = epxress.Router();

router.route('/products').get(getProducts);
router.route('/product/new').get(newProduct);

module.exports = router;