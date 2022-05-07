import React from "react";
import glogo from "../images/icon-google.png";

export default function Home() {
  return (
    <div className="login-container">  
    This is home 
      <div className="login-form-container">
        <form action className="form">
          <div className="m-2 text-center">
            <span className="form-title">Login With</span>
          </div>
          <div className="m-2">
            <button type="button" className="btn-google">
              <img src={glogo} alt="" /> Google
            </button>
          </div>
          <div className="m-2">
            <span>Username</span>
          </div>
          <div className="m-2">
            <input
              type="text"
              name="username"
              defaultValue
              className="form-input"
            />
          </div>
          <div className="m-2">
            <span className="m-2">Password</span>
            <a href="#">Forgot?</a>
          </div>
          <div className="m-2">
            <input
              type="password"
              name="password"
              className="form-input"
            />
          </div>
          <div className="m-2">
            <button type="submit" className="btn-signin">
              Log In
            </button>
          </div>
          <div className="m-2">
            <span>Not a User?</span>
            <a href="#">SignUp</a>
          </div>
        </form>
      </div>
    </div>
  );
}
