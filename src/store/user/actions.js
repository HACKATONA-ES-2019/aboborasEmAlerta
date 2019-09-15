import { firestore } from '../../lib/firebase';

export const SET_USER_DATA = 'SET_USER_DATA';
export function setUserData(userData) {
  return {
    type: SET_USER_DATA,
    data: userData,
  };
}

export const updateUserData = (userUid) => {
  return async dispatch => {
    try {
      console.log(userUid);
      const userData = await firestore.collection('users').doc(userUid).get();
      dispatch(setUserData(userData.data()));
    } catch (error) {
      console.log(error);
    }
  };
};
