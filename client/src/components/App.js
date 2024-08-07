import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import LoginAdmin from "./LoginAdmin";
import LoginUser from "./LoginUser";
import Navbar from "./Navbar";
import SignupAdmin from "./SignupAdmin";
import SignupUser from "./SignupUser";
import NewOrder from "./NewOrder";
import MyOrders from "./MyOrders";
import MapComponent from "./MapComponent";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/loginadmin" element={<LoginAdmin />} />
          <Route path="/loginuser" element={<LoginUser />} />
          <Route path="/signupadmin" element={<SignupAdmin />} />
          <Route path="/signupuser" element={<SignupUser />} />
          <Route path="/map" element={<MapComponent />} />{" "}
          {/* Ensure this path is correct */}
          <Route path="/new-order" element={<NewOrder />} />{" "}
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
