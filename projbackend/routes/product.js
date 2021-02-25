const express = require('express');
const router=express.Router();

const {getProductById,createProduct,getProduct, photo,updateProduct,deleteProduct,getAllProducts,getAllUniqueCategories}=require('../controllers/product');
const {isSignedin,isAuthenticated,isAdmin}=require('../controllers/auth');
const {getUserById}=require('../controllers/user');

// all params
router.param('userId',getUserById);
router.param('productId',getProductById);

//all routes
router.post('/product/create/:userId',isSignedin,isAuthenticated,isAdmin,createProduct)
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);

//updation routes
router.put('/product/:productId/:userId',isSignedin,isAuthenticated,isAdmin,updateProduct)

//deletion routes
router.delete('/product/:productId/:userId',isSignedin,isAuthenticated,isAdmin,deleteProduct)
//listing routes
router.get("/products",getAllProducts);

router.get('/product/catagories',getAllUniqueCategories);
module.exports=router;

