/**
 *
 * This file is the main entry point into our app.
 * It is shared across both Android and iOS.
 */
import React from 'react';
import InitializeFirebase from "./config/ConfigFirebase"; // This will initialize Firebase
import { View, Text} from 'react-native';
import * as androidfix from "./androidfix";
import LoginOrSignup from './screens/LoginOrSignup';
import Chat from './screens/Chat';
import generalCSS from './styles/styles.css';
import {onAuthStateChanged} from './api/firebaseAPI';


export default class App extends React.Component {
  
  /**
   * Holds reference to auth listener
   */
  authSubscription
  
  constructor() {
    super();
    //InitializeFirebase();
    
    // Set the default state of the component
    this.state = {
      loading: true,
    };
  }

  /**
   * Set the user once it signs in
   */
  setMyState = (user) => {
    this.setState({
      loading: false,
      user,
    });
  }

  /**
   * When the App component mounts, we need to listen for any authentication state changes
   * in Firebase.
   * Once subscribed, the 'user' parameter will either be null (logged out) or an Object (logged in)
   */
  componentDidMount() {
    this.authSubscription = onAuthStateChanged(this.setMyState);
  }

  /**
   * When the App component unmounts, we need to stop listening for any authentication state changes
   * in Firebase.
   */
  componentWillUnmount() {
    this.authSubscription();
  }

  /**
   * Render the application based on 3 states:
   *  1 - loading: onAuthStateChanged has not triggered yet, show nothing.
   *  2 - user<null>: If user is null, it means the user is not logged in and we'll show the
   *      LoginOrSignup screens to the user
   *  3 - user<Object>: If user is an Object, it means there's an account on the device and
   *      we'll show the LoggedIn screens (Chat page)
   */
  render() {
    if (this.state.loading) {
      return <View><Text>loading...</Text></View>;
    }  

    return (
      <View style={generalCSS.container}>
          {this.state.user ? (<Chat user={this.state.user} />): (<LoginOrSignup />)}
      </View>
    );
  }
}
