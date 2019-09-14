import {firestore, auth} from '../lib/firebase';

class User {
  constructor() {
    this.firestore = firestore;
    this.auth = auth;
  }

  get isLogged() {
    return this.auth.currentUser != null;
  }

  get uid() {
    return this.auth.currentUser ? this.auth.currentUser.uid : null;
  }

  async login(email, password) {
    await this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }
}
export default new User();
