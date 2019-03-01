import React from 'react';
import {GiftedChat, Day} from 'react-web-gifted-chat';
import moment from 'moment';
import generalCSS from '../styles/css';
import '../styles/styles.css';
import {firebaseApi} from '../firebase';


class Chat extends React.Component {
  
  /**
   * Holds reference to chat listener
   */
  chatSubscription;
  
  constructor(props) {
    super(props);
  
    this.state = {
      loading: true,
      messages: [],
      myUser : null,
      language: 'en',
      expanded: false
    };
  }

  /**
   * When the App component unmounts, we need to stop listening for any authentication state changes
   * in Firebase.
   */
  componentWillUnmount() {
    this.unsubscribeFromChat();
  }


  /**
   * Set the state every time a new message arrives
   */
  setMyState = (doc) => {
    if (doc.exists){
      const messages = doc.data().chat || [];
      
      this.setState({ loading: false, messages: messages.reverse() });
    } else{
      this.setState({ loading: false, messages:[]});
    } 
  }

  unsubscribeFromChat = () => {
    this.chatSubscription();
  }

  subscribeToChat = (language) => {
    console.log(this.chatSubscription);
    if (this.chatSubscription){
      this.unsubscribeFromChat();
    }

    this.chatSubscription = firebaseApi.onMessageArrived(language, this.setMyState);
  }

  async componentDidMount() {

    // Get User Credentials
    // const user = getCurrentUser();

    let myUser = {
      _id: this.props.user.uid,
      id: this.props.user.uid,
      name : this.props.user.email
    }

    await this.setState({myUser});

    await this.subscribeToChat(this.state.language);

  }

  /**
   * Store message into DB
   */
  storeNewMessage = (message) => {  
    message.createdAt = moment(message.createdAt).format();
    message.language = this.state.language;
    message.source = 'web';
    
    // only needed because there is Mobile version, and giftedChat uses
    // _id instead of id when loading the messages.
    message._id = message.id; 

    firebaseApi.saveMessage(this.state.language,message)
      .then(()=>console.log('message saved!'));
  }


  /** 
   * Display new message locally and send the message to DB to
   * be saved.
   */
  onSend(messages = []) {

    this.storeNewMessage(messages[messages.length-1]);

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  
  }

  renderDay(props) {
    return <Day {...props} textStyle={{color: 'black'}}/>
  }

  logOff() {
    try {
      firebaseApi.logout();
    } catch (error) {
        this.setState({
            response: error.toString()
        })
    }
  }

  onLanguageChange = (event) => {
    console.log(event.target.value);
    this.subscribeToChat(event.target.value);
    this.setState({messages:[] ,language: event.target.value});
  }

  onHeaderClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {

    const {  expanded, loading } = this.state;
    
    if (loading) {
      return null;
    }

    return (
        <div >
              <div className='container gutters'>
                  <div className='one'>
                      <button type="button" onClick={()=> this.onHeaderClick() } >
                          Touch here for more options
                      </button>
                  </div>      
              </div>     
              {expanded &&
                <div className='container gutters'>
                    <div className='one'>
                        <div className='container gutters'>
                            <div className='half'>
                                <label  >Language</label>
                            </div>
                            <div className='half'>
                              <select onChange={this.onLanguageChange}> >
                                <option selected  value="en">English</option>
                                <option  value="es">Español</option>
                                <option  value="pt">Portugues</option>
                              </select>
                            </div>
                        </div>
                        <div className='container gutters'>
                          <div className='one'>
                              <button className='button_container button_login' type="button" onClick={this.logOff} ><label className='button_text'>Logout</label></button>
                          </div>
                        </div>
                    </div>
                </div>  
              }
            <div className='container gutters'>
                <div className='sixth'></div>
                <div style={{...generalCSS.twothirds, ...generalCSS.chat_gifted}}>
                {/* <div className='chat_gifted third'> */}
                  <GiftedChat 
                      messages={this.state.messages}
                      onSend={messages => this.onSend(messages)}
                      user={this.state.myUser}
                      renderDay={this.renderDay}
                      // loadEarlier={true}
                  />
              </div>
              <div className='sixth'></div>
            </div>
        </div>
    );
  }

}

export default Chat
