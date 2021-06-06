import Firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCcosUVGv4lBXonxiKPywSaloOfwHBMykQ',
  authDomain: 'shopping-app-f4964.firebaseapp.com',
  projectId: 'shopping-app-f4964',
  storageBucket: 'shopping-app-f4964.appspot.com',
  messagingSenderId: '117134195311',
  appId: '1:117134195311:web:23102eecfa74e6b16f2b9a',
};

// let app;

// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

// const db = app.firestore();
// const auth = firebase.auth();

// export {auth, db};

const app = Firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
export const auth = Firebase.auth();
