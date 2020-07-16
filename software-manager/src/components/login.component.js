import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import axios from'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            isLoggedIn: false
        }
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
        }

        console.log(user);

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/login/', user, {withCredentials: true})
            .then(res => {
                console.log(res.data);
                if (res.data) {
                    window.location = '/dashboard';
                }
                else {
                    window.location = '/login';
                }
            });
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="text" className="form-control" value={this.state.email} onChange={this.onChangeEmail} placeholder="Email" id="email"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" value={this.state.password} onChange={this.onChangePassword} placeholder="Password" id="password"></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}