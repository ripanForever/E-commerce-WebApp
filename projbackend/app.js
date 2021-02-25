require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();

//middleware
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cors=require('cors');

//My routes
const authRoutes=require('./routes/auth.js');
const userRoutes=require("./routes/user");
const categoryRoutes= require('./routes/category');
const productRoutes= require('./routes/product');
const orderRoutes= require('./routes/order');
const stripeRoutes=require("./routes/stripepayment")



//DB Connection
mongoose.connect("mongodb://localhost:27017/tshirt",
 {useNewUrlParser: true, 
 useUnifiedTopology: true,
 useCreateIndex: true })
 .then(()=>{
     console.log('DB IS CONNECTED');
 }).catch((err)=>{
     console.log('ERROR occured',err);
 });  //It is used for database connection

 //All Middlewares
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(cors());
 app.use(cookieParser());

//My routes
app.use("/api",authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',orderRoutes);
app.use('/api',stripeRoutes);


//PORT
 const port=process.env.PORT;
 //starting server
 app.listen(port,()=>{
     console.log(`App is running on ${port}`);
 })