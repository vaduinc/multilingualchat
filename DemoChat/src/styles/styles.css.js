import * as Theme from '../theme';

const Common = {

// ========================== Global Style ===============================    
    container: {
        flex: 1,
        backgroundColor: Theme.SCREEN_BACKGROUND_COLOR,
    },
    simple_line: {
      backgroundColor: Theme.BORDER_COLOR, 
      height: 1, 
      marginTop: 2
    },

// ========================== Login page Style ===============================    
    login_form: {
        padding: 35
    },
    login_title: {
        paddingBottom: 16,
        textAlign: "center",
        color: Theme.DARK_COLOR,
        fontSize: 35,
        fontWeight: "bold",
    },
    login_submit: {
        paddingTop: 30
    },
    login_error: {
        textAlign: "center",
        color: Theme.ERROR_COLOR,
        paddingTop: 50,
        padding: 50
    },
    login_buttonContainer: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 1,
      },
    login_input: {
        color: Theme.DARK_COLOR,
        flex: 1,
        fontSize: 14,
        height: 40,
        padding: 3,
        marginTop: 2,
        marginBottom: 4,
        marginLeft: 8,
        marginRight: 16,
        backgroundColor: 'transparent',
        borderBottomColor: Theme.BUTTON_DISABLED,
        borderBottomWidth: 1,
      },

// ========================== Chat page Style ===============================      
      chat_container: {
        backgroundColor: 'white',
        margin: 10,
        marginTop: 35 ,
        borderRadius: 10,
        flex: 1
      },
      chat_chatBox: {
        height: '60%' 
      },
      chat_submit: {
        paddingTop: 0
      }, 
      chat_expand: {
        backgroundColor: Theme.BUTTON_DISABLED,
        alignItems: 'center',
        margin:1, 
        borderBottomLeftRadius: 15,
		    borderBottomRightRadius: 15,
        borderWidth: 1,
        flexDirection: 'column', 
      },
      chat_expand_header: {
         flexDirection: 'row', 
         justifyContent: 'center',
      },  
      chat_expand_header_title : {
        fontWeight: 'bold', 
        fontSize: 14
      },
      chat_expand_content : {
        width: '100%' , 
        margin:5 
      },  
      chat_picker: {
        width: 150, 
        height: 44
      },
      chat_picker_item: {
          height: 44
      },  
      chat_language_header :{
        height: 44, 
        justifyContent: 'center',
      },
      chat_language_title : {
        fontWeight: 'bold', 
        fontSize: 18
      },
      chat_language :{
        flexDirection: 'row',
        height: 45,
        margin: 5,
        justifyContent: 'center'
      },

// ========================== Button Style ===============================
      button_container: {
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: Theme.BUTTON,
        borderRadius: 10,
        flexDirection: 'row',
        height: 45,
        justifyContent: 'center',
        margin: 4,
        borderColor: Theme.DARK_COLOR,
        borderWidth: 1,
      },
      button_disabled: {
        backgroundColor: Theme.BUTTON_DISABLED,
      },
      button_text: {
        color: Theme.DARK_COLOR,
        marginLeft: 8,
      },
};

export default Common;