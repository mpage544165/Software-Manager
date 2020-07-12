import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Signup extends Component {

    render() {
        return (
            <form action='/signup' method="POST">
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" class="form-control" placeholder="Name" id="name"></input>
                </div>
                <div className="form-group">
                    <label for="email">Email:</label>
                    <input type="text" class="form-control" placeholder="Email" id="email"></input>
                </div>
                <div className="form-group">
                    <label for="password">Password:</label>
                    <input type="password" class="form-control" placeholder="Password" id="password"></input>
                </div>
                <div className="form-group">
                    <label for="password-confirm">Confirm Password:</label>
                    <input type="password" class="form-control" placeholder="Confirm password" id="password-confirm"></input>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        );
    }
}