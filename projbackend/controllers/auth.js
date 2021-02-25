const User = require("../models/user.js");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


exports.signup = (req, res) => {

//express validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(
      { error: errors.array()[0].msg});
  }

  const user = new User(req.body);
  // console.log(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    res.json(user);
  });
};

exports.signin = (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(
      { error: errors.array()[0].msg});
  }

  //Checking in Database
  const {email, password} = req.body;
  User.findOne({email}, (err,user)=>{
      if(err || !user)
      {
        return res.status(400).json({
          error: "User email doesn't exists"
        })
      }

      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Password do not match"
        });
      }

      //create token
      const token = jwt.sign({_id: user._id},process.env.SECRET);

      //put token in cookie
      res.cookie("token",token,{expire: new Date() + 999});


      //send response to the frontend
      const {_id,name,email,role}= user;
      return res.json({token,user:{_id,name,email,role}});


  })


}

exports.signout=(req,res)=>{

    res.clearCookie('token');
    return res.json({
        message: "User signed out successfully"
    })
}

//protect routes
exports.isSignedin = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth"
});

//Custom Middlewares
exports.isAuthenticated = (req,res,next) =>
{
  let checker= req.profile && req.auth && req.profile._id == req.auth._id;
  if(!checker)
  {
    return res.status(403).json({
      error: "ACCESS DENIED"
    })
  }
  next();
}

exports.isAdmin = (req,res,next) =>
{
  if(req.profile.role == 0)
  {
    return res.status(403).json({
      message: "You are not admin"
    })
  }
  next();
}