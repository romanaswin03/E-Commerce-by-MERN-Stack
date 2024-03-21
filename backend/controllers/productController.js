const Product = require('../models/productModel')
const ErrorHandler =require('../utils/errorHandler')

//Get product - api/v1/products
exports.getProducts = async(req,res,next)=>{
    try{
        const product = await Product.find();
        res.status(200).json({
            success: true,
            count: product.length,
            product
        })
    }
    catch(err){
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
    
}
//Created product - api/v1/product/new
exports.newProduct = async(req,res,next) =>{
    
        try{
            const product = await Product.create(req.body);
            res.status(200).json({
                success: true,
                message: "Product created sucessfully",
                product: product
            })

        }
    catch(err){
        res.status(402).json({
            error: err
        })
    }
}


//Get Single Product - api/v1/product/:id
exports.getSingleProduct = async(req,res,next) =>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json({
            success: true,
            product
        });
    }
    catch(err){
        next(new ErrorHandler('Product not found',404))
    }
}

// Update product - api/v1/product/:id
exports.updateProduct = async(req,res,next) =>{
try{
    const  product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    });
    res.status(200).json({
        success:true,
        message:"successfully updated",
        product: product
    });
}
catch(err){
    next(new ErrorHandler('Product not found',404))
}
}

// Delete product - api/v1/product/:id
exports.deleteProduct = async(req,res,next) =>{
    try{
       const product = await Product.findById(req.params.id);
       if(product){
        await product.deleteOne();
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
       }
       else{
        next(new ErrorHandler('Product already deleted from this database.',404))
       }
    }
    catch(err){
        next(new ErrorHandler('Product not found',404))
    } 
}