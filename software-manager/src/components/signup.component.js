import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Signup extends Component {

    render() {
        return (
            <form action='/signup' method="POST">
                <label>Name:</label>
                <input type="text" placeholder="Name"></input>
                <label>Email:</label>
                <input type="text" placeholder="Email"></input>
                <label>Password:</label>
                <input type="password" placeholder="Password"></input>
                <label>Confirm Password:</label>
                <input type="password" placeholder="Confirm password"></input>
            </form>
        );
    }
}