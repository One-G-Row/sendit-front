import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import LoginAdmin from "./LoginAdmin";
import LoginUser from "./LoginUser";
import Navbar from "./Navbar";
import SignupAdmin from "./SignupAdmin";
import SignupUser from "./SignupUser";
import UserForm from "./UserForm";

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/loginadmin" element={<LoginAdmin />} />
          <Route path="/loginuser" element={<LoginUser />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/signupadmin" element={<SignupAdmin />} />
          <Route path="/signupuser" element={<SignupUser />} />
          <Route path="/userform" element={<UserForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
