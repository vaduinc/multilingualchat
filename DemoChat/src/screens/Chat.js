import React from 'react';
import {View, Picker, Text, TouchableOpacity, Keyboard} from 'react-native';
import {GiftedChat, Day} from 'react-native-gifted-chat';
import Button from '../ui/Button';
import moment from 'moment';
import generalCSS from '../styles/styles.css';
import {saveMessage, logout, getCurrentUser, onMessageArrived} from '../api/firebaseAPI';


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
    if (this.chatSubscription){
      this.unsubscribeFromChat();
    }

    this.chatSubscription = onMessageArrived(language, this.setMyState);
  }

  async componentDidMount() {

    // Get User Credentials
    // const user = getCurrentUser();

    let myUser = {
      _id: this.props.user.uid,
      name : this.props.user.email
    }

    this.setState({myUser});

    this.subscribeToChat(this.state.language);

  }

  /**
   * Store message into DB
   */
  storeNewMessage = (message) => {  
    message.createdAt = moment(message.createdAt).format();
    message.language = this.state.language;
    message.source = 'mobile';

    saveMessage(this.state.language,message)
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
        logout();
    } catch (error) {
        this.setState({
            response: error.toString()
        })
    }
  }

  onLanguageChange = (itemValue, itemIndex) => {
    this.subscribeToChat(itemValue);
    this.setState({language: itemValue});
  }

  onHeaderClick = () => {
    if (!this.state.expanded){
      Keyboard.dismiss();
    }
    this.setState({ expanded: !this.state.expanded });
  }

  render() {

    const { expanded, loading } = this.state;
    
    if (loading) {
      return null;
    }

    return (
        <View style={generalCSS.chat_container}>
            <View style={[generalCSS.chat_expand, {height: expanded ? '20%' : '3%'}]} >
                      <TouchableOpacity style={generalCSS.chat_expand_header} onPress={()=> this.onHeaderClick() } >
                          <Text style={generalCSS.chat_expand_header_title} >Touch here for more options</Text>
                      </TouchableOpacity>
                      {expanded &&
                        <View style={generalCSS.chat_expand_content}>
                            <View style={generalCSS.chat_language}>
                                <View style={generalCSS.chat_language_header} >
                                    <Text style={generalCSS.chat_language_title} >Language</Text>
                                </View>
                                <Picker  style={generalCSS.chat_picker} itemStyle={generalCSS.chat_picker_item}
                                    selectedValue={this.state.language}
                                    onValueChange={(itemValue, itemIndex) => this.onLanguageChange(itemValue, itemIndex)}>
                                    <Picker.Item label="English" value="en" />
                                    <Picker.Item label="Español" value="es" />
                                </Picker>
                            </View>
                            <View style={generalCSS.chat_submit}>
                                <Button onPress={this.logOff} text="Logout"/>
                            </View>
                        </View>  
                        }
            </View>
            <View style={{margin:5, height: expanded ? '78%' : '90%' }} >
              <GiftedChat 
                  messages={this.state.messages}
                  onSend={messages => this.onSend(messages)}
                  user={this.state.myUser}
                  renderDay={this.renderDay}
              />
            </View>
        </View>
    );
  }

}

export default Chat
