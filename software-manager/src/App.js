import React, {Component} from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";
//import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';

import Navbar from "./components/navbar.component";
import Signup from "./components/signup.component";
import Login from "./components/login.component";
import Dashboard from './components/dashboard.component';
import CreateProject from './components/create-project.component';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.checkLoggedIn = this.checkLoggedIn.bind(this);

    this.state = {
      isLoggedIn: false
    }
  }

  /*componentDidMount() {
    this.checkLoggedIn();
  }*/

  checkLoggedIn() {
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:5000/login/logged_in/', {withCredentials: true})
        .then(res => {
            console.log("is logged in", res.data);
            this.setState({isLoggedIn: res.data});
        });
}

  render() {
    return (
      <Router>
        <div>
        <Navbar isLoggedIn = {this.state.isLoggedIn}/>
          <br/>
          <Route path = "/signup" component={Signup} />
          <Route path = "/login" render={props => <Login isLoggedIn={this.state.isLoggedIn} />} />
          <Route path = "/dashboard" render={props => <Dashboard isLoggedIn={this.state.isLoggedIn} checkLoggedIn = {this.checkLoggedIn} />}/>
          <Route path = "/createproject" render={props => <CreateProject isLoggedIn={this.state.isLoggedIn} checkLoggedIn = {this.checkLoggedIn} />}/>
          <Route path = "/logout" render={props => <Login isLoggedIn={this.state.isLoggedIn} />} />
        </div>
      </Router>
    );
  }
}

/*function App() {
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

export default App;*/
