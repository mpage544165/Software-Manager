import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
//import axios from'axios';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.props.checkLoggedIn();  
    }

    render() {
        console.log("Dash", this.props.isLoggedIn)
        if (this.props.isLoggedIn) {
            return <h1>Hello User</h1>; 
        }
        else {
            return <h1>Not Logged In</h1>;
        }
    }
}