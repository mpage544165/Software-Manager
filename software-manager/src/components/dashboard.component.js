import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//import axios from'axios';
import Calendar from './calendar-component';
import Projects from './create-project.component';
import Backlog from'./backlog.component';

const activeComponent = {
    calendar: <Calendar />,
    projects: <Projects />,
    backlog: <Backlog />
  };

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeComponent: "calendar"
        }

        this.props.checkLoggedIn();  
    }

    setActiveComponent(comp) {
        this.setState({
            activeComponent: comp
        })
    }

    render() {
        console.log("Dash", this.props.isLoggedIn)
        if ( this.props.isLoggedIn) {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <nav className="col-md-3">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <button className="btn btn-link" onClick={() => this.setActiveComponent('calendar')}>Dashboard</button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-link" onClick={() => this.setActiveComponent('projects')}>Projects</button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-link" onClick={() => this.setActiveComponent('backlog')}>Backlog</button>
                                </li>
                                <li className="nav-item">
                                    <Link to="/sprints" className="nav-link">&nbsp; Sprints</Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="col-md-8">
                            {activeComponent[this.state.activeComponent]}
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