import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/messaging';

import config from './config';

const app = Firebase.initializeApp(config.firebase);

export const firestore = app.firestore();
export const auth = app.auth();
export const messaging = app.messaging();
export default Firebase;
