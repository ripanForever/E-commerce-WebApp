import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
// import Modal from "./Modal"

const Card = ({ 
  product, 
  addtoCart = true, 
  removeFromCart = false,
  setReload=f=>f,
  // function(f){return f}
  reload=undefined
  })=> {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  // const [show, setShow] = useState(false);

  const cartTitle = product ? product.name : "Default";
  const cartPrice = product ? product.price : "DEFAULT";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/user/cart" />;
    }
  };

  const showAddToCart = addtoCart => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="addcart btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = removeFromCart => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="removecart btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  // const closeModalHandler = () => setShow(false);

  // const showModal=()=>{
  //   return (
  //     <div>
  //     {/* { show ? <div onClick={closeModalHandler} className="back-drop"></div> : null } */}
  //     <button onClick={() => setShow(true)} className="btn btn-block btn-outline-success mt-2 mb-2">Open Modal</button>
  //     <Modal show={show} close={closeModalHandler} />  
  //   </div>
  //   )
  // }

  return (
    <div
      className="card text-white bg-dark border border-info ml-3 "
      style={{ width: "15rem" }}>
      <ImageHelper product={product} />
      <div className="card-body">
      {getARedirect(redirect)}
        <p className=" font-weight-normal text-wrap mb-1">{cartTitle}</p>
        <p className="font-weight-bold mb-2">${cartPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
          
        </div>
      </div>
    </div>
  );
};

export default Card;
