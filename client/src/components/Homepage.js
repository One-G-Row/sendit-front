import React from "react";
import Navbar from "./Navbar";
import "./Homepage.css"; // Importing the CSS file for the homepage

function Homepage() {
  return (
    <div className="homepage">
      <Navbar />
      <header className="homepage-header">
        <h1>Welcome to SendIT</h1>
        <p>Your trusted courier service platform</p>
      </header>
      <section className="homepage-content">
        <h2>Features</h2>
        <ul>
          <li>Create and track parcels</li>
          <li>Manage delivery destinations</li>
          <li>Admin and user specific functionalities</li>
        </ul>
      </section>
    </div>
  );
}

export default Homepage;
