import React, {Component} from "react";
import '../styles/styles.css';
import {firebaseApi} from '../firebase';

class LoginOrSignup extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            error: ""
        };

        this.signMeUp = this.signMeUp.bind(this);
        this.logMeIn = this.logMeIn.bind(this);
    }

    /**
     * Creates new user and signs it in
     */
    signMeUp = async () => {
        try {
            await firebaseApi.signup(this.state.username, this.state.password);
        } catch (error) {
            this.setState({
                error: error.toString()
            })
        }
    }

    /**
     * Login existing user
     */
    logMeIn = async () => {
        try {
            await firebaseApi.login(this.state.username, this.state.password);
        } catch (error) {
            this.setState({
                error: error.toString()
            })
        }
    }


    setStateWithEvent = (event, columnType) => {
        let newState ={};
        
        newState[columnType] = event.target.value
        this.setState(newState);
    }

    render() {

        return (
            <div>
                <div className='container gutters'>
                    <div className='one'>
                        <label className='login_error'>{this.state.error}</label>
                    </div>
                </div>
                <div className='container gutters'>
                    <div className='one'>
                        <label className='login_title'>React Native + Firebase</label>
                    </div>
                </div>
                <div className='container gutters'>
                    <div className='one'>
                        <input className='login_input'
                            onChange={event => this.setStateWithEvent(event, 'username')}
                            placeholder='email'
                        />
                    </div>
                </div>
                <div className='container gutters'>
                    <div className='one'>
                        <input className='login_input'
                            onChange={event => this.setStateWithEvent(event, 'password')}
                            placeholder='password'
                        />
                    </div>
                </div>
                <div className='container gutters'>
                    <div className='one'>
                        <button className='button_container button_login' type="button" onClick={this.logMeIn} ><label className='button_text'>Login</label></button>
                    </div>
                </div>
                <div className='container gutters'>
                    <div className='one'>
                        <button className='button_container button_signup' type="button" onClick={this.signMeUp} ><label className='button_text'>Sign up</label></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginOrSignup;