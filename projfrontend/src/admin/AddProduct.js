import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createaProduct, getCategories } from "./helper/adminapicall";
import FlashMessage from "react-flash-message";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createProduct,
    getaRedirect,
    formData,
  } = values;
  const { user, token } = isAuthenticated();

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: event.target.value });
  };

  const preload = () => {
    getCategories().then((data) => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
        console.log(categories);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createaProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo:"",
            stock: "",
            loading: false,
            getaRedirect: true,
            createProduct: data.name,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const performRedirect=()=>{

  //   if(getaRedirect)
  //   { 
  //     setTimeout(() => {
  //       return <Redirect to="/admin/dashboard"/>
  //       }, 4000);
        
      
  //   }
  // }
  // const timer=()=>{
  //   
  // }

  const successMessage = () => {
    if (createProduct) {
      return  ( <FlashMessage duration={3000}>
        <strong>
          <h2>{createProduct} created Successfully....</h2>
        </strong>
      </FlashMessage>
      );
    }
  };


  const warningMessage = () => {
    if (error) {
      return (
        <FlashMessage duration={3000}>
            <h2>Product not created Successfully....</h2> 
        </FlashMessage>
      );
    }
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group ">
        <label className="btn btn-block btn-success rounded" htmlFor="validationDefault01">
          <input
            onChange={handleChange("photo")}
            id="validationDefault01"
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="validationDefault02">Name:</label>
        <input
          onChange={handleChange("name")}
          id="validationDefault02"
          name="photo"
          className="form-control"
          placeholder="Enter the Product Name"
          value={name}
          required
        />
        
      </div>
      <div className="form-group">
      <label htmlFor="validationDefault03">Description:</label>
        <textarea
          onChange={handleChange("description")}
          id="validationDefault03"
          name="photo"
          className="form-control"
          placeholder="Enter the Product Description"
          value={description}
          required
        />
      </div>
      <div className="form-group">
      <label htmlFor="validationDefault04">Price:</label>
        <input
          onChange={handleChange("price")}
          id="validationDefault04"
          type="number"
          className="form-control"
          placeholder="Enter the Product Price"
          value={price}
          required
        />
      </div>
      <div className="form-group">
      <label fohtmlForr="validationDefault05">Categories:</label>
        <select
          onChange={handleChange("category")}
          id="validationDefault05"
          className="form-control"
          placeholder="Category"
          required
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
      <label htmlFor="validationDefault06">Stock:</label>
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Enter the Product Stock"
          value={stock}
          id="validationDefault06"
          required
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-2 rounded"
      >
        Create Product
      </button>
    </form>
  );
  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4 rounded mb-5"
    >
      <Link
        to="/admin/dashboard"
        className="btn btn-sm btn-dark mb-1 p-1 rounded"
      > Admin Home
      </Link>
      <div className="row bg-dark text-white rounded p-0">
        <div className="col-md-9 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {createProductForm()}
          
          
        </div>
      </div>
   
    </Base>
  );
};

export default AddProduct;
