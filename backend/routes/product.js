const epxress = require('express');
const { getProducts, newProduct, getSingleProduct } = require('../controllers/productController');
const router = epxress.Router();

router.route('/products').get(getProducts);
router.route('/product/new').get(newProduct);
router.route('/product/:id').get(getSingleProduct);

module.exports = router;