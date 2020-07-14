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
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Home</Link>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    {!this.props.isLoggedIn && 
                        <li className="navbar-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li> &&
                        <li className="navbar-item">
                            <Link to="/signup" className="nav-link">Signup</Link>
                        </li>
                    }
                    {this.props.isLoggedIn &&
                        <li className="navbar-item">
                            <Link to="/logout" className="nav-link" onClick={this.logout()}>Logout</Link>
                        </li>
                    }
                </ul>
                </div>
            </nav>
        );
    }
}