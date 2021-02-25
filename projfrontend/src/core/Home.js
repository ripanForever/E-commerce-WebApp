import React,{useState,useEffect} from 'react';
import "../styles.css";
import {API} from "../backend";
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

export default function Home()
{

    const [products,setProducts]=useState([]);
    const [error,setError]=useState();

    const loadAllProducts=()=>{
      getProducts().then(data=>{
        if(data.error)
        {
          setError(data.error)
        }
        else
        {
          setProducts(data);
        }
      })
    }

    useEffect(() => {
      loadAllProducts();
    }, []);

  

     return ( 
          <Base title="WELCOME TO THE TSHIRT STORE">
         
              <h1 className="text-white text-center mb-2">All of Tshirts <hr className="bg-success"/></h1>
              <div className="row">
                {products.map((product,index)=>{
                  return(
                    <div key={index} className="home col-3 mb-2 mt-3 ">
                      <Card product={product}/>
                    </div>
                  )
  
                })}
              </div>
        
  
          </Base>
      )
   
}


