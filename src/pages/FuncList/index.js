//A intenção aqui é mostrar a lista dos funcionarios com as informações pertinentes
//talvez mais pro futuro adicionar as opções do que mostrar e tambem para mandar pro excel ou imprimir em pdf
import React, { useEffect, useState } from 'react'
import { doc,getDocs , collection, deleteDoc } from  'firebase/firestore'
import CreateFuncionario from '../../components/CreateFuncionario/CreateFuncionario';
import ReactModal from 'react-modal';
import { db } from '../../config/firebaseConfig/firebaseConfig';
import deleteButtonImage from '../../images/button/button-delete.png';
import editButtonImage from '../../images/button/button-edit.png';

import '../../App.css'
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

    async function deleteFunc(userID)
    {
        const confirmDelete = window.confirm("Tem certeza que deseja deletar esse Usuario?");
        if(confirmDelete){
        try{
            await deleteDoc(doc(db,"funcionarios",userID));
            alert("Funcionario Deletado com Sucesso");
        }catch(error){
            alert("Ouve um erro ao deletar o Funcionario",error)
        }
        }
    }
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
                <ReactModal isOpen={ModalIsOpen} onRequestClose={handleCloseModal} className="custom-modal" style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } }}>
                <CreateFuncionario userID={selectedID}  />
                </ReactModal>
            </div>
        <div className='table-container'>
            <table>
            <thead>
                <tr>
                    <th>AÇÃO</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Endereco</th>
                    <th>Numero</th>
                    <th>Estabelecimento</th>
                    <th>Função</th>
                    <th>Salario/h</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user}>
                    <td>
                        <button class="delete-button"><img src={deleteButtonImage} alt="Deletar" onClick={() => deleteFunc(user.id)}/></button>
                        <button class="edit-button" onClick={() => handleUserButtonClick(user.id)}>  <img src={editButtonImage} alt="Editar"/></button>
                    </td>
                    <td>{user.NOME}</td>
                    <td>{user.CPF}</td>
                    <td>{user.ENDERECO}</td>
                    <td>{user.ENUM}</td>
                    <td>{user.VINCULADO}</td>
                    <td>{user.FUNCAO}</td>
                    <td>{user.SALARIOHORA}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}

export default FuncList;

