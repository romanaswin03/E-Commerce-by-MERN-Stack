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
const multer = require('multer');
const path = require('path')

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,path.join(__dirname,'..', 'uploads/product'))
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})})

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct)

router.route('/review').put(isAuthenticateUser, createReview)
                        

//Admin routes
router.route('/admin/product/new').post(isAuthenticateUser, authorizedRoles('admin'),upload.array('images'), newProduct);
router.route('/admin/products').get(isAuthenticateUser, authorizedRoles('admin'), getAdminProducts);
router.route('/admin/product/:id').delete(isAuthenticateUser, authorizedRoles('admin'), deleteProduct);
router.route('/admin/product/:id').put(isAuthenticateUser, authorizedRoles('admin'),upload.array('images'), updateProduct);
router.route('/admin/reviews').get(isAuthenticateUser,authorizedRoles('admin'), getReviews)
router.route('/admin/review').delete(isAuthenticateUser,authorizedRoles('admin'),deleteReview)
module.exports = router;