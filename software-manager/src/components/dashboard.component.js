import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
//import axios from'axios';
import Calendar from './calendar-component';
import Projects from './create-project.component';
import Backlog from'./backlog.component';
import Sprint from './sprint.component';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.activeComponent = this.activeComponent.bind(this);

        this.state = {
            activeComponent: "calendar"
        }

        this.props.checkLoggedIn(); 
    }

    activeComponent({ currentProject, comp}) {
        return (
          <div>
            {
              {
                calendar: <Calendar currentProject={currentProject} />,
                projects: <Projects currentProject={currentProject} setCurrentProject={this.props.setCurrentProject}/>,
                backlog: <Backlog currentProject={currentProject} />,
                sprints: <Sprint currentProject={currentProject} />
              }[comp]
            }
          </div>
        );
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
                                    <button className="btn btn-link" onClick={() => this.setActiveComponent('sprints')}>Sprints</button>
                                </li>
                            </ul>
                        </nav>
                        <div className="col-md-8">
                            {this.activeComponent({currentProject: this.props.currentProject, comp: this.state.activeComponent})}
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