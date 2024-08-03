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
          <Route path="/" component={Homepage} />
          <Route path="/loginadmin" component={LoginAdmin} />
          <Route path="/loginuser" component={LoginUser} />
          <Route path="/navbar" component={Navbar} />
          <Route path="/signupadmin" component={SignupAdmin} />
          <Route path="/signupuser" component={SignupUser} />
          <Route path="/userform" component={UserForm} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
