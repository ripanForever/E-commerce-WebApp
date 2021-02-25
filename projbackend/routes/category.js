const express = require('express');
const router=express.Router();

const {getCatagoryById,createCategory,getCategory,getAllCategory,updateCategory,removeCategory}=require('../controllers/category');
const {isSignedin,isAuthenticated,isAdmin}=require('../controllers/auth');
const {getUserById}=require('../controllers/user');

//params
router.param("userId",getUserById);
router.param('categoryId',getCatagoryById);

//All routes
//create
router.post('/category/create/:userId',isSignedin,isAuthenticated,isAdmin,createCategory);

//read
router.get('/category/:categoryId',getCategory);
router.get('/categories-All',getAllCategory);

//update
router.put('/category/:categoryId/:userId',isSignedin,isAuthenticated,isAdmin,updateCategory);

//delete
router.delete('/category/:categoryId/:userId',isSignedin,isAuthenticated,isAdmin,removeCategory);


module.exports=router;