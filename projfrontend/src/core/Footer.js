import React from "react";
import { withRouter } from "react-router-dom";
import "../styles.css"

const submitStyle={
    padding:"30px"
  }

const Footer=()=>{
    return(
        <footer className="footer bg-dark mt-auto py-1">
        <div className="container-fluid bg-success text-white text-center py-2">
          <h4>If You got any Questions, feel free to reach out!</h4>
          <button className="btn btn-warning btn-sm py-1" style={submitStyle}>Contact Us</button>
        </div>
        <div className="container-sm">
          <span className="text-muted">
            An Amazing <span className="text-white">MERN</span>Bootcamp
          </span>
        </div>
      </footer>
   
    )
}
export default withRouter(Footer);