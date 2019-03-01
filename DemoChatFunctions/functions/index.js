const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const {Translate} = require('@google-cloud/translate');

// Instantiates a client
const translate = new Translate({
    projectId: 'demochat-d7f22',
  });


// Since this code will be running in the Cloud Functions environment
// we call initialize Firestore without any arguments because it
// detects authentication from the environment.
const firestore = admin.firestore();

const LANGUAGES = ['en', 'es', 'pt'];
const COLLECTION_NAME = 'chats';
const CHAT_ROOM = 'mychatroom1';

exports.updateChatMessage = functions.firestore
    .document('chats/{chatId}')
    .onUpdate(
        (change, context) => {

            const chatId = `${context.params.chatId}`;  
            console.log(chatId);

            // Get an object representing the current document
            const newValue = change.after.data();
            console.log(newValue);

            const messages = newValue.chat;
            const lastMessage = messages[messages.length - 1] ;

            if(lastMessage.source==='translated'){
                console.log('lastMessage was already translated!!!');
                console.log(lastMessage);
                return null;
            }
            console.log('LETS TRANSLATE THIS MESSAGE');
            console.log(lastMessage);

            const targetLanguages = LANGUAGES.filter((langId) => langId!==lastMessage.language);
            console.log('TARGET LANGUAGES ');
            console.log(targetLanguages);
            
            let translatePromises = targetLanguages.map((lang) => translateMessage(lang,lastMessage));

            return Promise.all(translatePromises);
        }   
    );  


/** 
 *  Translates some text (message) from language to a target language (parameter)
 */    
translateMessage = (language, lastMessage) =>{

    return translate.translate(lastMessage.text, {from: lastMessage.language, to: language})
            .then((results) => {

                console.log(' TRANSLATED!!! ') + results[0];

                let translatedMessage = lastMessage;
                translatedMessage.text = results[0];
                translatedMessage.source = 'translated';
                translatedMessage.language = language;

                console.log(translatedMessage);
                
                return saveMessage(language,translatedMessage);

            })
            .catch(err => {
                 console.error('ERROR:', err);
                 return null;
            });
}

/**
 * Saves the new translated message into the right chatroom language
 * collection.
 */
saveMessage = (language,message) => {  
    return firestore.collection(COLLECTION_NAME).doc(CHAT_ROOM+'-'+language)
            .update(
                { 
                    chat: admin.firestore.FieldValue.arrayUnion(message)
                }
            );
}    