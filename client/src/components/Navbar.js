import React from "react";
import { NavLink } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/user">User</NavLink>
        </li>
        <li>
          <NavLink to="/admin">Admin</NavLink>
        </li>
        <li>
          <NavLink to="/parcel">Parcels</NavLink>
        </li>
        <li>
          <NavLink to="/destination">Destination</NavLink>
        </li>
        <li>
          <NavLink to="/map">Map</NavLink> {/* Link to the map */}
        </li>
        <li>
          <NavLink to="/myorders">My Orders</NavLink>
        </li>
        <li>
          <NavDropdown title="Login">
            <NavDropdown.Item as={NavLink} to="/loginadmin">
              Login Admin
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/loginuser">
              Login User
            </NavDropdown.Item>
          </NavDropdown>
        </li>
        <li>
          <NavDropdown title="Signup">
            <NavDropdown.Item as={NavLink} to="/signupadmin">
              Signup Admin
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/signupuser">
              Signup User
            </NavDropdown.Item>
          </NavDropdown>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
