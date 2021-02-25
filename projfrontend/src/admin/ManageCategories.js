import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategories,deleteCategory } from "./helper/adminapicall";


const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory=(categoryId)=>{
    deleteCategory(categoryId,user._id,token).then(data=>{
      if(data.error)
      {
        console.log(data.error);
      }
      else
      {
        preload();
      }
    })

  }

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
            All Categories <hr className="bg-white" />
          </h2>
          <div className="row text-left mb-2">
            <div className="col-4">
              <h3 className="text-left text-white m-0 p-0">
                Categories:<hr className="bg-success m-1 p-0 w-50"></hr>
              </h3>
            </div>
          </div>
          {categories.map((category, index) => {
            return (
              <div
                key={index}
                className="row text-center mb-2 bg-info rounded m-0 p-1">
                <div className="col-4">
                  <h3 className="text-white text-left">{category.name}</h3>
                </div>

                <div className="col-4">
                  <Link
                    className="btn btn-success rounded p-2"
                    to={`/admin/category/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisCategory(category._id)
                    }}
                    className="btn btn-danger rounded p-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
