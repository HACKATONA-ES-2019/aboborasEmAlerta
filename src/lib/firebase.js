import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import config from './config';

const app = Firebase.initializeApp(config.firebase);

export const firestore = app.firestore();
export const auth = app.auth();
export default Firebase;
