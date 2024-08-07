import React from "react";
import { NavLink } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/" className="sendit">
            Send<span className="it">it</span>.
          </NavLink>
        </li>
        <li>
          <NavLink to="/new-order" className="links">
            New Order
          </NavLink>
        </li>
        <li>
          <NavLink to="/myorders" className="links">
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/allorders" className="links">
            All Orders
          </NavLink>
        </li>

        <li>
          <NavDropdown title="Login" className="loginsignup">
            <NavDropdown.Item as={NavLink} to="/loginadmin">
              Login Admin
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/loginuser">
              Login User
            </NavDropdown.Item>
          </NavDropdown>
        </li>

        <li>
          <NavDropdown title="Signup" className="loginsignup">
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
