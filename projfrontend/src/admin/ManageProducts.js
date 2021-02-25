import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = productId => {
    deleteProduct(productId, user._id, token)
    .then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
        <Base title="Welcome admin" description="Manage products here">
          <Link
            className="btn btn-sm btn-success rounded mb-4"
            to={`/admin/dashboard`}
          >
            <span className="">Admin Home</span>
          </Link>
          <div className="row ">
            <div className="col-10 offset-md-1">
              <h2 className="text-center text-white my-3">
                Total products <hr className="bg-white" />
              </h2>
              <div className="row text-left mb-2">
                  <div className="col-4">
                    <h3 className="text-left text-white m-0 p-0">Product Names:<hr className="bg-success m-1 p-0 w-50"></hr></h3>
                  </div>
                </div>
                  { products.map((product,index)=>{
                    return (
                    <div key={index} className="row text-center mb-2 bg-info rounded m-0 p-2">
                    <div className="col-4">
                      <h3 className="text-white text-left">{product.name}</h3>
                    </div>
                    
                      <div className="col-4">
                        <Link
                          className="btn btn-success rounded p-2"
                          to={`/admin/product/update/${product._id}`}
                        >
                          <span className="">Update</span>
                        </Link>
                      </div>
                      <div className="col-4">
                        <button onClick={()=>{
                          deleteThisProduct(product._id)
                        }} className="btn btn-danger rounded p-2"> 
                          Delete
                        </button>
                      </div>
                    </div>)
                  })} 
              </div>
            </div>
        </Base>
      );
    
};

export default ManageProducts;
