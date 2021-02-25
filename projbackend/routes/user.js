const express = require('express');
const router=express.Router();

const {getUserById,getUser,updateUser,userPurchaseList,pushOrderInPurchaseList}= require('../controllers/user');
const {isSignedin,isAuthenticated,isAdmin}= require('../controllers/auth');

router.param("userId",getUserById);

router.get('/user/:userId',isSignedin,isAuthenticated,getUser);

router.put('/user/:userId',isSignedin,isAuthenticated,updateUser);
router.get('orders/user/:userId',isSignedin,isAuthenticated,userPurchaseList);



module.exports=router;