import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import axios from'axios';

export default class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAudience = this.onChangeAudience.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            description: '',
            audience: ''
        }
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
            name: this.state.name,
            description: this.state.description,
            audience: this.state.audience,
        }

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/dashboard/createproject/', project, {withCredentials: true})
            .then(res => console.log(res.data));

        //window.location = '/login';
    }

    render() {
        return(
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
        )
    }
}