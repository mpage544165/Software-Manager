import React from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import Signup from "./components/signup.component";
import Login from "./components/login.component";
import Dashboard from './components/dashboard.component';

function App() {
  return (
    <Router>
      <div>
      <Navbar/>
        <br/>
        <Route path = "/signup" component={Signup} />
        <Route path = "/login" component={Login} />
        <Route path = "/dashboard" component={Dashboard} />
      </div>
    </Router>
  );
}

export default App;
