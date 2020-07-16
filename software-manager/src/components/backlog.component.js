import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
//import axios from'axios';
import BacklogItem from './backlog-item.component';

export default class Backlog extends Component {
    constructor(props) {
        super(props);

          this.state = {
              day: 0
          }
    }

    render() {

        return (
            <div class="container list-group">
                <BacklogItem />
            </div>
        );
    }
}