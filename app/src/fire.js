import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyD5hHoQSSkfnPKsGZnbIETCJOk0v-zx8AY',
  authDomain: 'stories-abe13.firebaseapp.com',
  databaseURL: 'https://stories-abe13.firebaseio.com',
  projectId: 'stories-abe13',
  storageBucket: 'stories-abe13.appspot.com',
  messagingSenderId: '943847825638',
};

var fire = firebase.initializeApp(config);
export default fire;
