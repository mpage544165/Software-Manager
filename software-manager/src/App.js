import React from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
//import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import Signup from "./components/signup.component";

function App() {
  return (
    <Router>
      <div>
      <Navbar/>
        <br/>
        <Route path = "/signup" exact component={Signup} />
      </div>
    </Router>
  );
}

export default App;
