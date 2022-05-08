import React from 'react';
import glogo from "../images/icon-google.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth, database } from "../firebaseconfig";
import { doc, updateDoc} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Login(){

   const [data, setData] = useState({
     email: "",
     password: "",
     error: null,
     loading: false,
   });

   const navigate = useNavigate();
   const {email, password, error, loading } = data;

   const handleChange = (e) => {
     setData({ ...data, [e.target.name]: e.target.value });
   };

   // name = email.substring(0, email.lastIndexOf("@"));
   const handleSubmit = async (e) => {
     e.preventDefault();
     setData({ ...data, error: null, loading: true });
     if (!email || !password) {
       setData({ ...data, error: "Required All Feilds" });
     }
     try {
       setData({ ...data, loading: true });
       const result = await signInWithEmailAndPassword(
         auth,
         email,
         password
       );
       // console.log(result.user)
       await updateDoc(doc(database, "users", result.user.uid), {
         isOnline: true,
       });
       setData({
         name: "",
         email: "",
         password: "",
         error: null,
         loading: false,
       });
       navigate("/home");
     } catch (err) {
       setData({ ...data, error: err.message, loading: false });
     }
   };


    return (
      <div className="login-container" onSubmit={handleSubmit}>
        <div className="login-form-container">
          <form action className="form">
            <div className="m-2 text-center">
              <span className="form-title">Login With</span>
            </div>
            <div className="m-2">
              <button type="button" className="btn-google">
                <img src={glogo} alt="icon" /> Google
              </button>
            </div>
            <div className="m-2">
              <span>Email</span>
            </div>
            <div className="m-2">
              <input
                type="email"
                className="form-input"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="m-2">
              <span className="m-2">Password</span>
              <a href="#">Forgot?</a>
            </div>
            <div className="m-2">
              <input
                type="password"
                className="form-input"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <p className="error-text">
              {error ? <p className="error">{error}</p> : null}
            </p>
            <div className="m-2">
              <button type="submit" className="btn-signin">
                {loading ? "Logging in ...." : "Login"}
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