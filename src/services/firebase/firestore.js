import { firebase } from './index';

const db = firebase.firestore();

export const createUser = async (displayName, email, phoneNumber, photoURL, providerId, uuid) => {
  try {
    const userCollection = db.collection('users');
    const snapshot = await userCollection.get();

    let userExist = false;
    snapshot.forEach(doc => {
      if (doc.data().email === email) {
        userExist = true;
      }
    });

    if (userExist) { return };

    return db.collection('users')
      .add({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        displayName,
        email,
        phoneNumber,
        photoURL,
        providerId,
        uuid
      });
  } catch (err) {
    console.log(err);
  }
};