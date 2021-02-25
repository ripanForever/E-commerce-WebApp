import React, { useState,useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategory, updateCategory } from "./helper/adminapicall";
import FlashMessage from 'react-flash-message'

const UpdateCategory = ({match}) => {
  const [name, setName] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError( data.error)
      } else {
        setName(data.name);   
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const onSumbit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    //backend api call
    updateCategory(match.params.categoryId, user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    }).catch((err) => {
        console.log(err);
      });
  };

  const goBack = () => {
    return (
      <div className="mt-2">
        <Link
          className="btn btn-sm btn-success mb-3 py-1 rounded"
          to="/admin/categories"
        >
          All Categories
        </Link>
      </div>
    );
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group m-auto">
          <h3 className="lead mt-3"><b>Enter the category</b></h3>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For Ex. Summer"
          />
          <button className="btn btn-outline-info py-1 mt-3 rounded" onClick={onSumbit}>
            Update Category
          </button>
        </div>
      </form>
    );
  };

  const successMessage = () => {

    if(success)
    { 
      return (<FlashMessage duration={6000} >
        <strong><b>Success!</b></strong><span> Updated Category Successfully..</span>
      </FlashMessage>)

    }
    
  };

  const errorMessage = () => {
    if(error)
    { 
      return (<FlashMessage duration={3000} >
        <strong><b>Error!</b></strong><span> Failed to update Category....</span>
      </FlashMessage>)

    }
  };

  return (       
    <Base
      title="Update a category here"
      description="Update category for new tshirts"
      className="container-sm bg-info p-4 w-50 rounded mb-4 mt-5"
    >
      
      <div className="row bg-white rounded">
        <div className="col-md-6 offset-md-2">
        {successMessage()}  
        {errorMessage()}  
        {myCategoryForm()}
        {goBack()}
        </div>
      </div>
    </Base>

  );
};

export default UpdateCategory;
