import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from'axios';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.checkLoggedIn();

        this.state ={
            isLoggedIn: false
        }
    }

    checkLoggedIn() {
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/login/logged_in/', {withCredentials: true})
            .then(res => {
                console.log("is logged in", res.data);
                this.setState({isLoggedIn: res.data});
            });
    }

    render() {
        if (this.state.isLoggedIn) {
            return <h1>Hello User</h1>; 
        }
        else {
            return <h1>Not Logged In</h1>;
        }
    }
}