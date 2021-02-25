import { API } from "../../backend";

//create Category
export const createCategory=(userId,token,category)=>{
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log("error");
    })

}
//get all categories
export const getCategories=()=>{
    return fetch(`${API}/categories-All`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))

}

//get A Category
export const getCategory=(categoryId)=>{
    return fetch(`${API}/category/${categoryId}`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

//delete Category
export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();             
      })
      .catch(err => console.log(err));
  };

//Update category
export const updateCategory=(categoryId,userId,token,category)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body: category
    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log(err);
    })
}




//products calls

//CREATE a Product
export const createaProduct=(userId,token,product)=>{
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log("error");
    })
}
//UPDATE product
export const updateProduct=(productId,userId,token,product)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log(err);
    })
}

//DELETE product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();             
      })
      .catch(err => console.log(err));
  };
  
//GET A Product
export const getProduct=(productId)=>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

//get ALL Products
export const getProducts=()=>{
    return fetch(`${API}/products`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))

}


