const express = require('express');
const router=express.Router();

const {makepayment}=require("../controllers/stripepayment")
const {getUserById,pushOrderInPurchaseList}=require('../controllers/user');
const {isSignedin,isAuthenticated,isAdmin}=require('../controllers/auth');

//params
router.param('userId',getUserById);

//routes
router.post("/payment",makepayment);


module.exports=router;