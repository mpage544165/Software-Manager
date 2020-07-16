import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import axios from'axios';
//import Project from '../../backend/models/project.model';

class ProjectItem extends Component {
    constructor(props) {
        super(props);

          this.state = {
              name: this.props.name,
              description: this.props.description,
          }
    }
    render() {
        return (
            <a href="#" className="list-group-item list-group-item-action">{this.state.name} <span className="badge badge-pill badge-primary float-right">0</span></a>
        );
    }
}

export default class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAudience = this.onChangeAudience.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            projects: [],
            name: '',
            description: '',
            audience: ''
        }
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/dashboard/projects/', {withCredentials: true})
            .then(res => {
                console.log(res.data);
                this.setState({
                    projects: res.data
                });
            });
    }

    projectList() {
        return(this.state.projects.map(item => {
            return <ProjectItem name={item.name} description={item.description} key={item._id}/>
        }))
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeAudience(e) {
        this.setState({
            audience: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const project = {
            userId: '',
            name: this.state.name,
            description: this.state.description,
            audience: this.state.audience,
            backlog: []
        }

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/dashboard/createproject/', project, {withCredentials: true})
            .then(res => {
                console.log(res.data);
                this.props.setCurrentProject(res.data._id);
            });

        //window.location = '/login';
    }

    render() {
        return(
            <div className="container">

                {this.projectList()}

                <br/>
                <h2>Create Project</h2>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Project Name:</label>
                        <input type="text" className="form-control"required value={this.state.name} onChange={this.onChangeName} placeholder="Project Name" id="name"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Project Description:</label>
                        <textarea className="form-control" value={this.state.description} onChange={this.onChangeDescription} id="description"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Describe the intended user:</label>
                        <textarea className="form-control" value={this.state.audience} onChange={this.onChangeAudience} id="audience"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Create Project</button>
                </form>
            </div>
        )
    }
}