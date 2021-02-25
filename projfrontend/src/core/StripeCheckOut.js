import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API, PUBLIC_KEY } from "../backend";
import { createOrder } from "./helper/orderHelper";



const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setdata] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

 const token1 =isAuthenticated() && isAuthenticated().token;
 const userId=isAuthenticated() && isAuthenticated().user._id
 
 
  const getFinalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };
  const makePayment = (token) => {
    const body = { token, products };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log("STATUS:", status);
     
          //to clear empty cart
          cartEmpty(()=>{
            console.log("DID WE GET ERROR!!");
        })
        setReload(!reload); //force reload

        const orderData={
            products: products,
            transaction_id: response.transaction.id,
            amount:response.transaction.amount
        }
        createOrder(userId,token1,orderData).then(result=>{
            console.log(result);
        }).catch(err=>{
            console.log(err);
        }); 

      
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showStripeButton = () => {
    return (
      <div>
        {isAuthenticated() && products.length > 0 ? (
          <StripeCheckoutButton
            stripeKey={PUBLIC_KEY}
            token={makePayment}
            amount={getFinalAmount() * 100}
            name="Buy Tshirts"
            shippingAddress
            billingAddress
          >
            <button className="btn btn-success rounded offset-sm-2">
              Pay with Stripe
            </button>
          </StripeCheckoutButton>
        ) : (
          <h3>Please add the product into cart for payment</h3>
        )}
      </div>
    );
  };

  return (
    <div>
      <h3 className="text-white offset-sm-1 mb-4">
        Stripe Checkout {getFinalAmount()}
      </h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
