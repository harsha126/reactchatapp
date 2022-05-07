import React from "react";

export default function Notfound() {
  return (
    <div className="login-container">
      <div className="login-form-container">
        <form action className="form">
          <div className="m-2 text-center">
            <span className="form-title">Login With</span>
          </div>
          <div className="m-2">
            <button type="button" className="btn-google">
              {" "}
              <img src="icon-google.png" alt="" /> Google
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
              type="text"
              name="username"
              defaultValue
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
