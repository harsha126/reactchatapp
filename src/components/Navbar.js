import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {auth,database} from '../firebaseconfig'
import {signOut} from 'firebase/auth'
import {updateDoc,doc} from 'firebase/firestore'
import { useContext } from "react";
import { AuthContext,useAuth } from "../context/auth";
function Navbar() {

  const  curruser  = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await updateDoc(doc(database,'users',auth.currentUser.uid),{
      isOnline:false,
    })
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="nav">
      <input type="checkbox" id="nav__checkbox" className="nav__checkbox" />
      <label htmlFor="nav__checkbox" className="nav__toggle">
        <svg className="menu" viewBox="0 0 448 512" width={100} title="bars">
          <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
        </svg>
        <svg className="close" viewBox="0 0 384 512" width={100} title="times">
          <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
        </svg>
      </label>
      <ul className="nav__menu">
        <li>
          <NavLink to="/">
            <svg viewBox="0 0 384 512" width={100} title="chess-rook">
              <path d="M368 32h-56a16 16 0 0 0-16 16v48h-48V48a16 16 0 0 0-16-16h-80a16 16 0 0 0-16 16v48H88.1V48a16 16 0 0 0-16-16H16A16 16 0 0 0 0 48v176l64 32c0 48.33-1.54 95-13.21 160h282.42C321.54 351 320 303.72 320 256l64-32V48a16 16 0 0 0-16-16zM224 320h-64v-64a32 32 0 0 1 64 0zm144 128H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" />
            </svg>
          </NavLink>
        </li>
        {
          !curruser ?(
          <>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/signup">SignUp</NavLink>
          </li>
          <li>
            <NavLink to="/forgot-password">forgot</NavLink>
          </li>
        </>):(
        <>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/profile">profile</NavLink>
          </li>
          <li>
            <NavLink to="/reset-password">reset</NavLink>
          </li>
          <li onClick={handleSignOut}>
            <NavLink to="/" >Logout</NavLink>
          </li>
        </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
 