import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//import axios from'axios';
import Calendar from './calendar-component';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        //this.props.checkLoggedIn();  
    }

    render() {
        console.log("Dash", this.props.isLoggedIn)
        if (!this.props.isLoggedIn) {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <nav className="col-md-3">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/dashboard" className="nav-link">&nbsp; Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/createproject" className="nav-link">&nbsp; Projects</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/backlog" className="nav-link">&nbsp; Backlog</Link>
                                </li>
                                <li className="nav-item">
                                <Link to="/sprints" className="nav-link">&nbsp; Sprints</Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="col-md-8">
                            <Calendar />
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return <h1>Not Logged In</h1>;
        }
    }
}