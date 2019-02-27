
import firebase from '@firebase/app';
import '@firebase/auth';
import 'firebase/firestore';
import {getDataConfig} from './config';

if (!firebase.apps.length) {
    firebase.initializeApp(getDataConfig());
}

export const auth = firebase.auth();
export const db = firebase.firestore();