import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
//import axios from'axios';

export default class BacklogItem extends Component {
    constructor(props) {
        super(props);

          this.state = {
              task: '',
              priority: 0
          }
    }

    render() {

        return (
        <a href="#" class="list-group-item list-group-item-action">{this.state.task} <span class="badge badge-pill badge-primary float-right">{this.state.priority}</span></a>
        );
    }
}