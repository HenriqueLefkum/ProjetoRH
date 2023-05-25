import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

//puxa o banco de dados
const firebaseApp = initializeApp({
    apiKey: "AIzaSyCtmACpdp5WRYiRo81ZTUQeAslNc6R3pPk",
    authDomain: "siterh-ad136.firebaseapp.com",
    projectId: "siterh-ad136",
    storageBucket: "siterh-ad136.appspot.com",
    messagingSenderId: "319601638665",
    appId: "1:319601638665:web:3cdeb0f0aedd58a179e7d8",
    measurementId: "G-9590PMJBLR"
});
//inicia o banco de dados
const db = getFirestore(firebaseApp);

export {db};