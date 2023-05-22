//A intenção aqui é mostrar a lista dos funcionarios com as informações pertinentes
//talvez mais pro futuro adicionar as opções do que mostrar e tambem para mandar pro excel ou imprimir em pdf {users.map((user) => (
// <tr key={user.id}></tr>
import React, { useEffect, useState } from 'react'
import { getDocs , collection } from  'firebase/firestore'
import CreateFuncionario from '../../../components/CreateFuncionario/CreateFuncionario';
import ReactModal from 'react-modal';
import { db } from '../../../config/firebaseConfig/firebaseConfig';

import './FuncListStyle.css'
function FuncList()
{

    const[users,setUsers] = useState([]);
    const userCollectionRef = collection(db,'funcionarios');

    useEffect(() => {
        //criando uma variavel asyncrona para pegar os usuarios
        const getUsers = async () => {
        //usando getdocs para puxar o firestore
        const data = await getDocs(userCollectionRef);
        //setando os usuarios em uma array durante que o id do documento seja igual
        setUsers(data.docs.map((doc) => ({...doc.data(), id : doc.id})));
      };
        //executa a função que chamamos
        getUsers();
      }, []);
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
                <CreateFuncionario userID={selectedID} />
                </ReactModal>
            </div>
        <div className='table-container'>
            <table>
            <thead>
                <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Endereco</th>
                <th>Numero</th>
                <th>PIS</th>
                <th>Função</th>
                <th>Salario/h</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user}>
                    <td><button onClick={() => handleUserButtonClick(user.id)}>{user.NOME}</button></td>
                    <td><button onClick={() => handleUserButtonClick(user.id)}>{user.CPF}</button></td>
                    <td><button onClick={() => handleUserButtonClick(user.id)}>{user.ENDERECO}</button></td>
                    <td><button onClick={() => handleUserButtonClick(user.id)}>{user.ENUM}</button></td>
                    <td><button onClick={() => handleUserButtonClick(user.id)}>{user.PIS}</button></td>
                    <td><button onClick={() => handleUserButtonClick(user.id)}>{user.FUNCAO}</button></td>
                    <td><button onClick={() => handleUserButtonClick(user.id)}>{user.SALARIOHORA}</button></td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}

export default FuncList;

