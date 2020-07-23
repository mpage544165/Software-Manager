import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import axios from'axios';
import BacklogItem from './backlog-item.component';

export default class Backlog extends Component {
    constructor(props) {
        super(props);

        this.selectBacklogItem = this.selectBacklogItem.bind(this);
        this.onChangeTask = this.onChangeTask.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangeSprintDescription = this.onChangeSprintDescription.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onSubmitSprint = this.onSubmitSprint.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

          this.state = {
              task: '',
              priority: 0,
              tasks: [],
              selectedTasks: [],
              sprintDescription: '',
              startDate: new Date(),
              endDate: new Date(),
          }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/dashboard/${this.props.currentProject}/backlog`)
            .then(res => {
                this.setState({tasks: res.data}, () => {
                    console.log("Tasks: ", this.state.tasks);
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    backlogItems() {
        return(this.state.tasks.map(item => {
            return <BacklogItem task={item.task} priority={item.priority} key={item._id} selectBacklogItem={this.selectBacklogItem}/>
        }))
    }

    selectBacklogItem(task) {
        const newTasks = this.state.selectedTasks;
        newTasks.push(task);
        this.setState({
            selectedTasks: newTasks
        });
    }

    onChangeTask(e) {
        this.setState({
            task: e.target.value
        });
    }

    onChangePriority(e) {
        this.setState({
            priority: e.target.value
        });
    }

    onChangeSprintDescription(e) {
        this.setState({
            sprintDescription: e.target.value
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

    onSubmitSprint(e) {
        e.preventDefault();
        console.log(this.state.selectedTasks);

        const sprint = {
            projectId: this.props.currentProject,
            backlog: this.state.selectedTasks,
            description: this.state.sprintDescription,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        }

        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:5000/dashboard/${this.props.currentProject}/createSprint`, sprint, {withCredentials: true})
            .then(res => {
                console.log(res.data);
            });
    }

    onSubmit(e) {
        e.preventDefault();

        const item = {
            task: this.state.task,
            priority: this.state.priority,
        }

        console.log(item);

        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:5000/dashboard/${this.props.currentProject}/addBacklogItem`, item, {withCredentials: true})
            .then(res => {
                console.log(res.data);
            });
    }

    render() {
        return (
            <div className="container list-group">
                {this.backlogItems()}
                <br/>

                {this.state.selectedTasks.length &&

                //todo make sprint form a component
                <form onSubmit={this.onSubmitSprint}>
                    <div className="form-group">
                        <label htmlFor="description">Sprint Description:</label>
                        <input type="text" className="form-control" value={this.state.sprintDescription} onChange={this.onChangeSprintDescription} placeholder="Add description..." id="description"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="start-date">Start Date:</label>
                        <input type="date" className="form-control" onChange={this.onChangeStartDate} id="start-date"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="end-date">End Date:</label>
                        <input type="date" className="form-control" onChange={this.onChangeEndDate} id="end-date"></input>
                    </div>
                    <button type="submit" className="btn btn-success">Create Sprint</button>
                    <br/>
                </form>}
                
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="task">Task:</label>
                        <input type="text" className="form-control" value={this.state.task} onChange={this.onChangeTask} placeholder="Add task..." id="task"></input>
                    </div>
                    <label htmlFor="priority">Task Priority:</label>
                    <select className="form-control" id="priority" onChange={this.onChangePriority}>
                        <option defaultValue={true}>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <button type="submit" className="btn btn-primary">Add to Backlog</button>
                </form>
            </div>
        );
    }
}