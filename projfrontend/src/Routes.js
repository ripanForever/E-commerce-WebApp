import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageCategories from "./admin/ManageCategories";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import AdminDashboard from "./user/AdminDashBoard";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashboard from "./user/UserDashBoard";
import UpdateCategory from "./admin/UpdateCategory"
import Cart from "./core/Cart";



const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup}/>
        <Route path="/signin" exact component={Signin}/>
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
        <AdminRoute path="/admin/create/category" exact component={AddCategory}/>
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard}/>
        <AdminRoute path="/admin/categories" exact component={ManageCategories}/>
        <AdminRoute path="/admin/create/product" exact component={AddProduct}/>
        <AdminRoute path="/admin/products" exact component={ManageProducts}/>
        <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
        <AdminRoute path="/admin/category/:categoryId" exact component={UpdateCategory}/>
        <PrivateRoute path="/user/cart" exact component={Cart}/>
        

        
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
