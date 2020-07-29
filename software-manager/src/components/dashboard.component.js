import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import axios from'axios';
import Calendar from './calendar-component';
import Projects from './create-project.component';
import Backlog from'./backlog.component';
import Sprint from './sprint.component';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.activeComponent = this.activeComponent.bind(this);
        this.setSprints = this.setSprints.bind(this);

        this.state = {
            activeComponent: "calendar",
            sprints: []
        }

        this.props.checkLoggedIn(); 
    }

    activeComponent({ currentProject, sprints, comp}) {
        return (
          <div>
            {
              {
                calendar: <Calendar currentProject={currentProject} sprints={sprints} />,
                projects: <Projects currentProject={currentProject} setCurrentProject={this.props.setCurrentProject}/>,
                backlog: <Backlog currentProject={currentProject} />,
                sprints: <Sprint currentProject={currentProject} sprints={this.state.sprints} />
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

    setSprints() {
        axios.get(`http://localhost:5000/dashboard/${this.props.currentProject}/sprints/`)
            .then(res => {
                this.setState({sprints: res.data}, () => {
                    console.log("Project", this.props.currentProject, "Sprints: ", res.data); 
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.setSprints();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentProject !== this.props.currentProject) {
            this.setSprints();
        }
    }

    render() {
        console.log("Dash", this.props.isLoggedIn)
        if ( this.props.isLoggedIn) {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <nav className="col-md-2 bg-dark-green">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <button className="btn btn-link btn-lg text-light" onClick={() => {this.setActiveComponent('calendar'); this.setSprints()}}>Dashboard</button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-link btn-lg text-light" onClick={() => this.setActiveComponent('projects')}>Projects</button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-link btn-lg text-light" onClick={() => this.setActiveComponent('backlog')}>Backlog</button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-link btn-lg text-light" onClick={() => this.setActiveComponent('sprints')}>Sprints</button>
                                </li>
                            </ul>
                        </nav>
                        <div className="col">
                            {this.activeComponent({currentProject: this.props.currentProject, sprints: this.state.sprints, comp: this.state.activeComponent})}
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