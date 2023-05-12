import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

//puxa o banco de dados
const firebaseApp = initializeApp({
    apiKey: "AIzaSyAARFLZoq6gM23JDf6tEtz4IR98MOOQrlQ",
    authDomain: "siterh-897b0.firebaseapp.com",
    projectId: "siterh-897b0",
    storageBucket: "siterh-897b0.appspot.com",
    messagingSenderId: "1012908564774",
    appId: "1:1012908564774:web:af28af0bae9aa3f268a1e7"
});
//inicia o banco de dados
const db = getFirestore(firebaseApp);

export {db};