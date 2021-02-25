const express = require('express');
const router=express.Router();

const {isSignedin,isAuthenticated,isAdmin}=require('../controllers/auth');
const {getUserById,pushOrderInPurchaseList}=require('../controllers/user');
const {updateStock}=require('../controllers/product');

const {getOrderById,createOrder,getAllOrders,updateStatus,getOrderStatus}=require('../controllers/order');

//params
router.param('userId',getUserById);
router.param('orderId',getOrderById);

//actual routes

router.post("/order/create/:userId",isSignedin,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder)

//all orders
router.get('/order/all/:userId',isSignedin,isAuthenticated,isAdmin,getAllOrders);

//status
router.get("/order/status/:userId",isSignedin,isAuthenticated,getOrderStatus);

router.post("/order/:orderId/status/:userId",isSignedin,isAuthenticated,isAdmin,updateStatus)




module.exports=router;