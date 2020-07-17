import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
//import axios from'axios';

export default class BacklogItem extends Component {
    constructor(props) {
        super(props);

          this.state = {
              task: this.props.task,
              priority: this.props.priority
          }
    }

    render() {

        return (
        <a href="#" className="list-group-item list-group-item-action" >{this.state.task} 
            <span className="badge badge-pill badge-primary float-right">{this.state.priority}</span>
        </a>
        );
    }
}