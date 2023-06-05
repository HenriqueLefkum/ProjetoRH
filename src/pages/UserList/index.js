import { db } from "../../config/firebaseConfig/firebaseConfig"
import React, { useState, useEffect} from "react"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"
import ReactModal from "react-modal";
import CreateUsuario from "../../components/CreateUsuario/CreateUsuario";
import "../../App.css";
import deleteButtonImage from '../../images/button/button-delete.png';
import editButtonImage from '../../images/button/button-edit.png';


function UserList()
{
    //constantes para acessar o banco
    const[users,setUsers] = useState([]);
    //useEffect para pegar os usuarios do banco de forma assyncrona
    useEffect(() =>{
        const getUsers = async() => {
            const data = await getDocs(collection(db,"Usuarios"));

            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        getUsers();
    }, [])

    async function deleteFunc(userID)
    {
        const confirmDelete = window.confirm("Tem certeza que deseja deletar esse Usuario?");
        if(confirmDelete){
            try{
                await deleteDoc(doc(db,"Usuarios",userID));
                alert("Funcionario Deletado com Sucesso");
            }catch(error){
                alert("Ouve um erro ao deletar o Funcionario",error)
            }
        }   
    }

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
        <div className='container'>
            <div className="content-box">
            <div className='button-box'>
                <button onClick={handleOpenModal}>Add</button>
                <ReactModal isOpen={ModalIsOpen} onRequestClose={handleCloseModal} className="custom-modal" style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } }}>
                <CreateUsuario ID={selectedID} fecharModal={handleCloseModal} />
                </ReactModal>
            </div>
        <div className='table-container'>
            <table>
            <thead>
                <tr>
                <th>AÇÃO</th>
                <th>NOME</th>
                <th>EMAIL</th>
                <th>CPF</th>
                <th>DATA NASCIMENTO</th>
                <th>DATA ENTRADA</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) =>(
                <tr key={user}>
                    <td>
                        <button class="delete-button"><img src={deleteButtonImage} alt="Deletar" onClick={() => deleteFunc(user.id)}/></button>
                        <button class="edit-button" onClick={() => handleUserButtonClick(user.id)}>  <img src={editButtonImage} alt="Editar"/></button>
                    </td>
                    <td>{user.NOME}</td>
                    <td>{user.EMAIL}</td>
                    <td>{user.CPF}</td>
                    <td>{user.DATANAS}</td>
                    <td>{user.DATAENT}</td>
                </tr>
               ))}
            </tbody>
            </table>
        </div>
        </div>
        </div>
    );
}

export default UserList;