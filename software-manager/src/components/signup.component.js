import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from'axios';

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
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

    onChangeConfirmPassword(e){
        this.setState({
            confirmPassword: e.target.value
        });
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
                    <input type="text" className="form-control"required value={this.state.name} onChange={this.onChangeName} placeholder="Name" id="name"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" className="form-control" value={this.state.email} onChange={this.onChangeEmail} placeholder="Email" id="email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" value={this.state.password} onChange={this.onChangePassword} placeholder="Password" id="password"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password-confirm">Confirm Password:</label>
                    <input type="password" className="form-control" value={this.state.confirmPassword} onChange={this.onChangeConfirmPassword} placeholder="Confirm password" id="password-confirm"></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}