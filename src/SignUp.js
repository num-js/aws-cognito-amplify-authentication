import React, { Component } from 'react';
import { Auth } from "aws-amplify";


export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            name: '',
            password: '',
            email: '',
            phoneNumber: '',
            confirmationCode: '',
            isSignup: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { isSignup, userName, name, email, password, phoneNumber, confirmationCode } = this.state;

        if (!isSignup) {
            Auth.signUp({
                username: userName,
                password: password,
                attributes: {
                    name: name
                }
            }).then((res) => {
                console.log('Signed Up:- ', res)
                this.setState({
                    isSignup: true
                });
            }).catch(err => console.log(err));


        } else {
            Auth.confirmSignUp(userName, confirmationCode)
                .then(() => console.log('Confirmed Sign Up'))
                .catch(err => console.log(err))
        }
    }

    confirmSignUpWithconfirmationCode = (e) => {
        e.preventDefault();
        const { userName, confirmationCode } = this.state;


        Auth.confirmSignUp(userName, confirmationCode)
            .then((res) => {
                console.log('Confirmed Sign Up:- ', res)

            })
            .catch(err => console.log(err))
    }

    render() {
        const { isSignup } = this.state;
        if (isSignup) {
            return (
                <>
                    <form onSubmit={this.confirmSignUpWithconfirmationCode}>
                        <label>UserName</label>
                        <input type='text' name="userName" onChange={this.handleChange} /> <br />

                        <label>Confirmation Code</label>
                        <input type='text' name="confirmationCode" onChange={this.handleChange} /> <br />

                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </>
            )
        } else {
            return (
                <>
                    <h3>SignUp</h3>
                    <form onSubmit={this.handleSubmit}>
                        <label>UserName</label>
                        <input type='text' name="userName" onChange={this.handleChange} /> <br />

                        <label>Name</label>
                        <input type='text' name="name" onChange={this.handleChange} /> <br />

                        <label>Email</label>
                        <input type='email' name="email" onChange={this.handleChange} /> <br />

                        <label>Password</label>
                        <input type='password' name="password" onChange={this.handleChange} /> <br />

                        <label>Phone No.</label>
                        <input type='text' name="phoneNumber" onChange={this.handleChange} /> <br />

                        <br />
                        <button type="submit">Submit</button>
                    </form>

                    <br />
                    <br />
                    <br />

                    <h3>Enter Confirmation Code if you are already SignedUp</h3>
                    <form onSubmit={this.confirmSignUpWithconfirmationCode}>
                        <label>UserName</label>
                        <input type='text' name="userName" onChange={this.handleChange} /> <br />

                        <label>Confirmation Code</label>
                        <input type='text' name="confirmationCode" onChange={this.handleChange} /> <br />

                        <br />
                        <button type="submit">Submit</button>
                    </form>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                </>
            )
        }
    }
}