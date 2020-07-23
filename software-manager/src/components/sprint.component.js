import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import axios from'axios';
//import SprintBacklogItem from './sprint-backlog-item.component';

class SprintItem extends Component {
    constructor(props) {
        super(props);

        this.sprintBacklogItems = this.sprintBacklogItems.bind(this);

          this.state = {
              description: this.props.sprint.description,
              id: this.props.sprint._id,
              startDate: this.props.sprint.startDate,
              endDate: this.props.sprint.endDate,
              tasks: this.props.sprint.backlog
          }
    }

    sprintBacklogItems() {
        return(this.state.tasks.map(item => {
            return <li key={item.task}>{item.task}</li>
        }))
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{this.state.description}</h4>
                    <p className="card-text">Start date: {new Date(this.state.startDate).toDateString()}</p>
                    <p className="card-text">End date: {new Date(this.state.endDate).toDateString()}</p>
                    <ul>
                        {this.sprintBacklogItems()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default class Sprint extends Component {
    constructor(props) {
        super(props);

        this.sprints = this.sprints.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

          this.state = {
              sprints: [],
              description: '',
              startDate: new Date(),
              endDate: new Date(),
              //tasks: []
          }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/dashboard/${this.props.currentProject}/sprints/`)
            .then(res => {
                this.setState({sprints: res.data}, () => {
                    console.log("Sprints: ", this.state.sprints);
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    sprints() {
        return(this.state.sprints.map(item => {
            const sprint = {
                _id: item._id,
                description: item.description,
                startDate: item.startDate,
                endDate: item.endDate,
                backlog: item.backlog,
            }

            return <SprintItem sprint={sprint} key={sprint._id}/>
        }))
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeStartDate(e) {
        this.setState({
            startDate: e.target.value
        });
    }

    onChangeEndDate(e) {
        this.setState({
            endDate: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const sprint = {
            description: this.state.description,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        }

        console.log(sprint);

        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:5000/dashboard/${this.props.currentProject}/addSprint`, sprint, {withCredentials: true})
            .then(res => {
                console.log(res.data);
            });
    }

    render() {
        return (
            <div className="container list-group">
                <br/>
                {this.sprints()}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="description">Sprint Description:</label>
                        <input type="text" className="form-control" value={this.state.task} onChange={this.onChangeTask} placeholder="Add description..." id="description"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="start-date">Start Date:</label>
                        <input type="date" className="form-control" onChange={this.onChangeStartDate} id="start-date"></input>
                    </div>
                    <div className="form-group">
                    <label htmlFor="end-date">End Date:</label>
                    <input type="date" className="form-control" onChange={this.onChangeEndDate} id="end-date"></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Create Sprint</button>
                </form>
            </div>
        );
    }
}