const epxress = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = epxress.Router();
const {isAuthenticateUser} = require('../middlewares/authenticate')

router.route('/products').get(isAuthenticateUser, getProducts);
router.route('/product/new').post(newProduct);
router.route('/product/:id')
                            .get(getSingleProduct)
                            .put(updateProduct)
                            .delete(deleteProduct)

module.exports = router;