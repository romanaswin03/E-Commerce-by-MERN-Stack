const express = require('express');
const multer = require('multer');
const path = require('path')

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,path.join(__dirname,'..', 'uploads/user'))
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})})

const { registerUser, 
    loginUser, 
    logoutUser,
    forgotpassword, 
    resetPassword, 
    getUserProfile,
    changePassword,
    updateProfile,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/authController');
const router = express.Router();
const {isAuthenticateUser, authorizedRoles} = require('../middlewares/authenticate');

router.route('/register').post(upload.single('avatar'), registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotpassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/myprofile').get(isAuthenticateUser, getUserProfile);
router.route('/password/change').put(isAuthenticateUser, changePassword)
router.route('/update').put(isAuthenticateUser,upload.single('avatar'), updateProfile)

//Admin routes
router.route('/admin/users').get(isAuthenticateUser,authorizedRoles('admin'), getAllUsers)
router.route('/admin/user/:id').get(isAuthenticateUser,authorizedRoles('admin'), getUser)
                               .put(isAuthenticateUser,authorizedRoles('admin'), updateUser)
                               .delete(isAuthenticateUser,authorizedRoles('admin'), deleteUser)

module.exports = router;