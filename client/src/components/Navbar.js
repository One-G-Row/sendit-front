import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/loginadmin">Login Admin</NavLink>
      <NavLink to="/loginuser">Login User</NavLink>
      <NavLink to="/signupadmin">SignUp Admin</NavLink>
      <NavLink to="/signupuser">SignUp User</NavLink>
      <NavLink to="/userform">User Form</NavLink>
    </nav>
  );
}

export default Navbar;
