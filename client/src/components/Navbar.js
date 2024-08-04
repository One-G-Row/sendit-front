import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
        <NavLink to="/">Home</NavLink>
        </li>
        <li>
        <NavLink to="/loginadmin">Login Admin</NavLink>
        </li>
        <li>
        <NavLink to="/loginuser">Login User</NavLink>
        </li>
        <li>
        <NavLink to="/signupadmin">SignUp Admin</NavLink>
        </li>
        <li>
        <NavLink to="/signupuser">SignUp User</NavLink>
        </li>
        <li>
        <NavLink to="/userform">User Form</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
