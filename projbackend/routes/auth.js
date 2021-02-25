const express = require('express');
const {signout,signup,signin} =  require('../controllers/auth.js');
const { check, validationResult } = require('express-validator');

const router=express.Router();


router.post('/signup',[
   check('name').isLength({ min: 3 }).withMessage('Name should be at least 3 char'), //express-validator functions
   check('email').isEmail().withMessage('Email is required'),
   check('password').isLength({ min: 5 }).withMessage("Password should be at least 3 char")
],signup);

router.post('/signin',[
   check('email').isEmail().withMessage('Email is required'),
   check('password').isLength({ min: 5 }).withMessage("Password should be required")
],signin);


router.get("/signout",signout);



module.exports=router;