import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from'axios';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1>Hello User</h1>
        );
    }
}