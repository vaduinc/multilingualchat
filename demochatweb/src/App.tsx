import React, { Component } from 'react';
import {firebase , firebaseApi} from './firebase';
import LoginOrSignup from './screens/LoginOrSignup';
import Chat from './screens/Chat';


type State = {
  // Whether Firebase is still checking if the user is logged in or out
  loading: boolean,
  // The Firebase user
  user?: Object,
}

type Props = {};

class App extends Component<Props, State> {

 /**
   * Holds reference to auth listener
   */
   authSubscription!: () => any;
  
  constructor(props: any) {
    super(props);
    
    // Set the default state of the component
    this.state = {
      loading: true,
    };
  }

  /**
   * Set the user once it signs in
   */
  setMyState = (user: Object) => {
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
    //this.authSubscription = onAuthStateChanged(this.setMyState);
    this.authSubscription = firebaseApi.onAuthStateChanged(this.setMyState);
  }

  /**
   * When the App component unmounts, we need to stop listening for any authentication state changes
   * in Firebase.
   */
  componentWillUnmount() {
    this.authSubscription();
  }

  render() {

    if (this.state.loading) {
      return <div><span>loading...</span></div>;
    }  


    return (
      <div >
          {this.state.user ? (<Chat user={this.state.user} />): (<LoginOrSignup />)}
      </div>
    );
  }
}

export default App;
