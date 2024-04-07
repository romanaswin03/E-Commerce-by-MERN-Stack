const epxress = require('express');
const { 
    getProducts, 
    newProduct, 
    getSingleProduct, 
    updateProduct,
    deleteProduct, 
    createReview, 
    getReviews, 
    deleteReview, 
    getAdminProducts 
    } = require('../controllers/productController');
const router = epxress.Router();
const {isAuthenticateUser, authorizedRoles} = require('../middlewares/authenticate')

router.route('/products').get(getProducts);
router.route('/product/:id')
                            .get(getSingleProduct)
                            .put(updateProduct)
                            .delete(deleteProduct)

router.route('/review').put(isAuthenticateUser, createReview)
                        .delete(deleteReview)
router.route('/reviews').get(isAuthenticateUser, getReviews)

//Admin routes
router.route('/admin/product/new').post(isAuthenticateUser, authorizedRoles('admin'), newProduct);
router.route('/admin/products').get(isAuthenticateUser, authorizedRoles('admin'), getAdminProducts);
module.exports = router;