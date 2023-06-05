import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

//puxa o banco de dados
const firebaseApp = initializeApp({
    //firebase Credentials
});
//inicia o banco de dados
const db = getFirestore(firebaseApp);

export {db};
