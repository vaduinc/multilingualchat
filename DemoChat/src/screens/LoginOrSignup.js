import {TextInput,Text, View} from "react-native";
import React, {Component} from "react";
import Button from '../ui/Button';
import generalCSS from "../styles/styles.css";
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

    render() {

        return (
            <View >
                <View>
                    <Text style={generalCSS.login_error}>{this.state.error}</Text>
                </View>
                <View style={generalCSS.login_form}>
                    <Text style={generalCSS.login_title}>ITalkThat2</Text>
                    <View style={[generalCSS.login_buttonContainer]}>
                        <TextInput
                            onChangeText={(username) => this.setState({username})}
                            style={generalCSS.login_input}
                            placeholder='email'
                        />
                    </View>
                    <View style={[generalCSS.login_buttonContainer]}>
                        <TextInput
                            onChangeText={(password) => this.setState({password})}
                            style={generalCSS.login_input}
                            placeholder='password'
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={generalCSS.login_submit}>
                        <Button onPress={this.logMeIn} text="Login"/>
                        <Button containerStyle={{backgroundColor:'lightblue'}} onPress={this.signMeUp} text="Sign up"/>
                    </View>
                </View>
            </View>
        );
    }
}

export default LoginOrSignup;