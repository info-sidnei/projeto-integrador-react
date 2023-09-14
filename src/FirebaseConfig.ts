const {initializeApp} = require ('firebase/app')
const {initializeAuth} = require ('firebase/auth')
const { browserLocalPersistence } = require ('firebase/auth')


const firebaseConfig = {
    apiKey: "AIzaSyA4KAQBK28C6fxlKxJojmfwZvMGreWiwsk",
    authDomain: "pharmaplain.firebaseapp.com",
    projectId: "pharmaplain",
    storageBucket: "pharmaplain.appspot.com",
    messagingSenderId: "611564053805",
    appId: "1:611564053805:web:4b0d8c13ffc734dbe1dfa4",
    measurementId: "G-GNM2MEVEQ6"
};

export const app = initializeApp(firebaseConfig);
  
export const auth = initializeAuth(app, {
    persistence: browserLocalPersistence
});



