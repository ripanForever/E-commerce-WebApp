import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckOut";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2 className="mb-3">ALL THE PRODUCTS</h2>
        {products.map((product, index) => (
          <div className="mb-2 mt-3">
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
          </div>
        ))}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <StripeCheckout
      products={products}
      setReload={setReload}
      reload={reload}
      />
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row p-2 m-5 bg-info rounded ">
        <div className="col-6">{products.length >0 ? loadAllProducts(products):(<h3>No products in Cart</h3>)}</div>
        <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
};

export default Cart;
