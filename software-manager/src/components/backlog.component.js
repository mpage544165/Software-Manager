import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import axios from'axios';
import BacklogItem from './backlog-item.component';

export default class Backlog extends Component {
    constructor(props) {
        super(props);

        this.onChangeTask = this.onChangeTask.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

          this.state = {
              task: '',
              priority: 0,
              tasks: []
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
            return <BacklogItem task={item.task} priority={item.priority} key={item._id}/>
        }))
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