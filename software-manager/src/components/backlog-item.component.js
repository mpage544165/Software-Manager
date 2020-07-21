import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
//import axios from'axios';

export default class BacklogItem extends Component {
    constructor(props) {
        super(props);

        this.selectItem = this.selectItem.bind(this);

          this.state = {
              task: this.props.task,
              priority: this.props.priority,
              isSelected: false,
          }
    }

    selectItem() {
        this.setState({isSelected: !this.state.isSelected});
        this.props.selectBacklogItem(this.state);
    }

    render() {

        return (
        <a href="#" className={`list-group-item list-group-item-action ${this.state.isSelected ? 'list-group-item-success' : ''}`} onClick={this.selectItem}>{this.state.task} 
            <span className="badge badge-pill badge-primary float-right">{this.state.priority}</span>
        </a>
        );
    }
}