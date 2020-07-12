import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from'axios';

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: 'Matthew',
            email: '123@gmail.com',
            password: '123',
            confirmPassword: '123'
        }
    }


    onSubmit(e) {
        e.preventDefault();

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        }

        console.log(user);

        axios.post('http://localhost:5000/signup/', user)
            .then(res => console.log(res.data));

        //window.location = '/';
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" placeholder="Name" id="name"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" className="form-control" placeholder="Email" id="email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" placeholder="Password" id="password"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password-confirm">Confirm Password:</label>
                    <input type="password" className="form-control" placeholder="Confirm password" id="password-confirm"></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}