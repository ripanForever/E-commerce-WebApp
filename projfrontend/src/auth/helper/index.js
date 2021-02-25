import {API} from "../../backend";

//API means :http://localhost/api

export const signup=(user)=>{
    return fetch(`${API}/signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}

export const signin=(user)=>{
    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}
export const signout=next=>{
    if(typeof window !=="undefined")
    {
        localStorage.removeItem("jwt");
        next();

        return fetch(`${API}/signout`,{
            method:"GET"
        })
        .then(response=>console.log("signout successfully"))
        .catch(err=>{console.log(err);})

    }
};

//to set token into browser localstorage from database
export const authenticate=(data,next)=>{
    if(typeof window !=="undefined")
    {
        localStorage.setItem("jwt",JSON.stringify(data));
        next();
    }
};

//to get token from browser localstorage
export const isAuthenticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  };
  