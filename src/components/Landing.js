import React from "react";
import pic1 from "../images/pic1.jpeg";
import pic2 from "../images/pic2.jpeg";
import { Link } from "react-router-dom";


export default function Landing() {
  return (
    <div className="land-container">
      <img src = {pic1}/>
      <h2> Connect With Your Friends </h2>
      <div className="land-link">
        <Link to="/login"> Login </Link>
      </div>
      <div className="land-link">
        <Link to="/signup"> Sign Up </Link>
      </div>
    </div>
  );
}
