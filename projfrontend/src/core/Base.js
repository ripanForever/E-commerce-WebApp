import React from "react";
import Menu from "./Menu";
import Footer from "../core/Footer";
import "../styles.css";
import {useMediaQuery} from "react-responsive"

const Base = ({
  title = "My Title",
  description = "",
  className = "bg-dark text-white p-2 mt-3",
  children,
}) => {

  //const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1042px)' });
  return ( <div>
    <Menu/>
    <div className="container-fluid mt-4">
      <div className="jumborton bg-dark text-white text-center">
        <h3 className="display-4">{title}</h3>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    {/* <div className="container-fluid p-5"> */}
      <Footer />
    {/* </div> */}
  </div>)
};

export default Base;
