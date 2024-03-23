const epxress = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = epxress.Router();
const {isAuthenticateUser, authorizedRoles} = require('../middlewares/authenticate')

router.route('/products').get(isAuthenticateUser, getProducts);
router.route('/product/new').post(isAuthenticateUser, authorizedRoles('admin'), newProduct);
router.route('/product/:id')
                            .get(getSingleProduct)
                            .put(updateProduct)
                            .delete(deleteProduct)

module.exports = router;