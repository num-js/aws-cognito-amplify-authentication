import React, { Component } from 'react';
import { Auth } from "aws-amplify";


export default class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: '',
            isSignIn: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { userName, password } = this.state;

        if (userName !== '' && password !== '') {
            Auth.signIn({
                username: userName,
                password: password,
            })
                .then((res) => {
                    console.log('Signed In :- ', res)
                    this.setState({
                        isSignIn: true
                    });
                })
                .catch(err => console.log('err in Sign In:-', err));


            Auth.confirmSignIn(userName)
                .then((res) => console.log('Confirmed Sign In ', res))
                .catch(err => console.log(err))


        }
    }

    render() {
        const { isSignIn } = this.state;
        if (isSignIn) {
            return (
                <>
                    <h1>U r SignedIn</h1>
                </>
            )
        } else {
            return (
                <>
                    <form onSubmit={this.handleSubmit}>
                        <label>UserName</label>
                        <input type='text' name="userName" onChange={this.handleChange} />

                        <label>Password</label>
                        <input type='password' name="password" onChange={this.handleChange} />

                        <button type="submit">SignIn</button>
                    </form>
                </>
            )
        }
    }
}