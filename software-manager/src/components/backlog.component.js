import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from'axios';
import BacklogItem from './backlog-item.component';

export default class Backlog extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

          this.state = {
              tasks: []
          }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/dashboard/${this.props.id}/backlog`)
            .then(res => {
                this.setState({tasks: res.data});
            })
            .catch(err => {
                console.log(err);
            });
    }

    onSubmit(e) {
        e.preventDefault();

        const item = {
            task: this.state.task,
            priority: this.state.priority,
        }

        console.log(item);

        //todo get project _id

        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:5000/dashboard/${this.props.id}/addBacklogItem`, item, {withCredentials: true})
            .then(res => {
                console.log(res.data);
            });
    }

    render() {

        return (
            <div className="container list-group">
                <BacklogItem />

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="task">Task:</label>
                        <input type="text" className="form-control" value={this.state.task} onChange={this.onChangeEmail} placeholder="Add task..." id="task"></input>
                    </div>
                    <label for="priority">Task Priority:</label>
                    <select class="form-control" id="priority">
                        <option>1</option>
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