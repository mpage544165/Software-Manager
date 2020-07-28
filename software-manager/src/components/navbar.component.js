import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
//import router from '../../backend/routes/users';

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout() {
        axios.post('http://localhost:5000/logout/')
            .then(res => console.log(res.data));
    }

    render() {

        console.log("props", this.props.isLoggedIn);
        return (
            <nav className="navbar navbar-dark bg-green navbar-expand-lg">
                <Link to="/" className="navbar-brand text-light">Home</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse navbar-right" id="collapsibleNavbar">
                <ul className="nav navbar-nav">
                    {!this.props.isLoggedIn && 
                        <div className="d-flex">
                            <li className="navbar-item">
                                <Link to="/login" className="nav-link text-light">Login</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/signup" className="nav-link text-light">Signup</Link>
                            </li>
                        </div>
                    }
                    {this.props.isLoggedIn &&
                        <div className="d-flex">
                            <li className="navbar-item">
                                <Link to="/dashboard" className="nav-link text-light">Dashboard</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/createproject" className="nav-link text-light">Create Project</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/logout" className="nav-link text-light" onClick={this.logout}>Logout</Link>
                            </li>
                        </div>
                    }
                </ul>
                </div>
            </nav>
        );
    }
}