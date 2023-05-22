import { db } from "../../config/firebaseConfig/firebaseConfig"
import React, { useState, useEffect} from "react"
import { collection, getDocs, doc, setDoc } from "firebase/firestore"
import ReactModal from "react-modal";
import CreateUsuario from "../../components/CreateUsuario/CreateUsuario";
import "../../App.css"

function UserList()
{
    //constantes para acessar o banco
    const[users,setUsers] = useState([]);
    const userCollectionRef = collection(db,'usuarios');
    //useEffect para pegar os usuarios do banco de forma assyncrona
    useEffect(() =>{
        const getUsers = async() => {
            const data = await getDocs(userCollectionRef);

            setUsers(data.docs.map((doc) = ({...doc.data(), id: doc.id})));
        }
    }, [])

    //constantes e funções para os modais
    const[ModalIsOpen, setModalIsOpen] = useState(false);
    const[selectedID,setSelectedID] = useState('');
    const handleOpenModal = () =>
    {
        setModalIsOpen(true);
    }
    const handleCloseModal = () => {
        setModalIsOpen(false);
        setSelectedID('');
    }
    function handleUserButtonClick(id)
    {
        setSelectedID(id);
        setModalIsOpen(true);
        console.log(id);
    }

    return(
        <div className='content-box'>
            <div className='button-box'>
                <button onClick={handleOpenModal}>Add</button>
                <ReactModal isOpen={ModalIsOpen} onRequestClose={handleCloseModal}>
                <CreateUsuario userID={selectedID} />
                </ReactModal>
            </div>
        <div className='table-container'>
            <table>
            <thead>
                <tr>
                <th>AÇÃO</th>
                <th>NOME</th>
                <th>CPF</th>
                <th>EMAIL</th>
                <th>DATA NASCIMENTO</th>
                <th>DATA ENTRADA</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) =>(
                <tr key={user}>
                    <td></td>
                    <td><button onClick={() => handleUserButtonClick(user.id)}>user.NOME</button></td>
                    <td><button onClick={() => handleUserButtonClick(user.id)}>user.EMAIL</button></td>
                    <td><button onClick={() => handleUserButtonClick(user.id)}>user.CPF</button></td>
                    <td><button onClick={() => handleUserButtonClick(user.id)}>user.DATANAS</button></td>
                    <td><button onClick={() => handleUserButtonClick(user.id)}>user.DATAENT</button></td>
                </tr>
               ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}

export default UserList;