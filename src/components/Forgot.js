import React from "react";

export default function Forgot() {
  return (
    <div className="login-container">
      <div className="login-form-container">
        <form action className="form">
          <div className="m-2 text-center">
            <span className="form-title">Forgot Password</span>
          </div>
          <div className="m-2">
            <span>Email</span>
          </div>
          <div className="m-2">
            <input
              type="email"
              name="username"
              className="form-input"
              required
            />
          </div>
          <div className="m-2">
            <button type="submit" className="btn-signin">
              Send
            </button>
          </div>
         </form>
      </div>
    </div>
  );
}
