const Product = require('../models/productModel')
const ErrorHandler =require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures');

//Get product - api/v1/products
exports.getProducts = catchAsyncError(async(req,res,next)=>{
        const resPerPage = 3;
        //const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);

        
        let buildQuery = () => {
            return new APIFeatures(Product.find(), req.query).search().filter()
        }
        const filteredProductsCount = await buildQuery().query.countDocuments({});
        const totalProductsCount = await Product.countDocuments({});

        let productsCount = totalProductsCount;

        if(filteredProductsCount != totalProductsCount){
            productsCount = filteredProductsCount;
        }
        
        const products = await buildQuery().paginate(resPerPage).query;
        res.status(200).json({
            success: true,
            count: productsCount,
            resPerPage,
            products
        })
})
//Created product - api/v1/product/new
exports.newProduct = catchAsyncError(async(req,res,next) =>{
            
            req.body.user = req.user.id;

            const product = await Product.create(req.body);
            res.status(200).json({
                success: true,
                message: "Product created sucessfully",
                product
            })
});


//Get Single Product - api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async(req,res,next) =>{

        const product = await Product.findById(req.params.id).populate('reviews.user','name email');
        if(!product){
            return next(new ErrorHandler('Product not found',404))
            
        }
        res.status(200).json({
            success: true,
            product
        })   
})

// Update product - api/v1/product/:id
exports.updateProduct = catchAsyncError(async(req,res,next) =>{
    let product = await Product.findById(req.params.id);

    if(!product){
        res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })
})

// Delete product - api/v1/product/:id
exports.deleteProduct = catchAsyncError(async(req,res,next) =>{
    
       const product = await Product.findById(req.params.id);
       if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
       }

       await product.deleteOne();

       res.status(200).json({
        success: true,
        message: "Product deleted"
       })
})


//Create Review - api/v1/review

exports.createReview = catchAsyncError(async (req, res, next) =>{
    const { productId, rating, comment } = req.body;

    const review = {
        user: req.user.id,
        rating,
        comment
    }

    const product = await Product.findById(productId);
    //Finding user review already exist
    const isReviewed = product.reviews.find(review => {
        return review.user.toString() == req.user.id.toString()
    })

    if(isReviewed){
        //updating the review
        product.reviews.forEach(review => {
            if(review.user.toString() == req.user.id.toString()){
                review.comment = comment
                review.rating = rating
            }
        })
    }else{
        //Creating the review
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length;
    }

    //Finding average of the product reviews
    product.ratings = product.reviews.reduce((acc,review)=>{
        return review.rating + acc;
    },0)/product.reviews.length;
    product.ratings = isNaN(product.ratings)?0:product.ratings;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true
    })
})

//Get Reviews - api/v1/reviews
exports.getReviews = catchAsyncError(async(req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})


//Delete Review - api/v1/review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    //filtering the reviews which does not match the review id
    const reviews = product.reviews.filter(review =>{
        return review._id.toString() !== req.query.id.toString()
    });
    //num of reviews
    const numOfReviews = reviews.length;
    //finding the average with the filtered reviews
    let ratings = reviews.reduce((acc, review) => {
        return review.rating + acc;
    },0)/reviews.length;
    ratings = isNaN(ratings)?0:ratings;
    //saving the product
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        numOfReviews,
        ratings
    })
    res.status(200).json({
        success: true
    })
})

// get Admin products - api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).send({
        success: true,
        products
    })
});