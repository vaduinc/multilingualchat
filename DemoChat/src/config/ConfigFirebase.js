
//import * as firebase from "firebase";
import firebase from '@firebase/app'
import '@firebase/auth'
import {getDataConfig} from './config';

// export default () => {
//     firebase.initializeApp(getDataConfig());
// }

export default !firebase.apps.length ? firebase.initializeApp(getDataConfig()) : firebase.app();