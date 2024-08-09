import React from "react";
import { NavLink } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, admin, logout } = useAuth(); // Assume `logout` is a function from your auth context

  
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <ul>
          <li>
            <NavLink to="/" className="sendit">
              Send<span className="it">it</span>.
            </NavLink>
          </li>

          {/* Conditionally render links based on user role */}
          {user && (
            <>
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
            </>
          )}

          {admin && (
            <li>
              <NavLink to="/allorders" className="links">
                All Orders
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-right">
        {/* Conditional rendering for Login/Signup vs Logout */}
        {!user && !admin ? (
          <>
            <NavDropdown title="Login" className="loginsignup">
              <NavDropdown.Item as={NavLink} to="/loginadmin">
                Login Admin
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/loginuser">
                Login User
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Signup" className="loginsignup">
              <NavDropdown.Item as={NavLink} to="/signupadmin">
                Signup Admin
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/signupuser">
                Signup User
              </NavDropdown.Item>
            </NavDropdown>
          </>
        ) : (
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
