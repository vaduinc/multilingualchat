import firebase from '@firebase/app';

import { auth , db } from "./ConfigFirebase";

// List of output languages.
export const LANGUAGES = ['en', 'es'];

const COLLECTION_NAME = 'chats';
const CHAT_ROOM = 'mychatroom1';


 /**
   * When the App component mounts, we need to listen for any authentication state changes
   * in Firebase.
   * Once subscribed, the 'user' parameter will either be null (logged out) or an Object (logged in)
   */
    export const onAuthStateChanged = (callback) => {
        return auth.onAuthStateChanged(callback);
    }

    /**
     * Create a new user and login it to the app if no error when creating the user
     * 
     * @param {*} username 
     * @param {*} password 
     */
    export const signup =  (username, password) => {
        return auth.createUserWithEmailAndPassword(username, password);
    }

    /**
     * Login the user if no errors
     * @param {*} username 
     * @param {*} password 
     */
    export const login = (username, password) => {
        return auth.signInWithEmailAndPassword(username, password);
    }

    /**
     * Log out the current user
     */
    export const logout = () => {
        auth.signOut();
    }

    /**
     * Get the current logged user
     */
    export const getCurrentUser = () => {
        return auth.currentUser;
    }

    /**
     * Store a new message into Chats collection
     * @param {} message 
     */
    export const saveMessage = (language,message) => {  
        return db.collection(COLLECTION_NAME).doc(CHAT_ROOM+'-'+language)
                .update(
                        { 
                            chat: firebase.firestore.FieldValue.arrayUnion(message)
                        }
                    )
    }


    /**
     * Message listener.
     * It listens to any changes in the "chats" collection and the document with
     * ID "mychatroom1" 
     * @param {} callback 
     */
    export const onMessageArrived = (language,callback) => {
        return db.collection(COLLECTION_NAME).doc(CHAT_ROOM+'-'+language).onSnapshot(callback);
    }