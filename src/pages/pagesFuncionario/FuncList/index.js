//A intenção aqui é mostrar a lista dos funcionarios com as informações pertinentes
//talvez mais pro futuro adicionar as opções do que mostrar e tambem para mandar pro excel ou imprimir em pdf {users.map((user) => (
// <tr key={user.id}></tr>
import React, { useEffect, useState } from 'react'
import {addDocs, getDocs , collection } from  'firebase/firestore'
import CreateFuncionario from '../../../components/CreateFuncionario/CreateFuncionario';
import ReactModal from 'react-modal';
import { db } from '../../../config/firebaseConfig/firebaseConfig';

import './FuncListStyle.css'
function FuncList()
{
    /*
    const[nome,setNome] = useState("");
    const[CPF, setCPF] = useState("");
    const[Endereco,setEndereco] = useState("");
    const[eNum, seteNum] = useState("");
    const[Cidade,setCidade] = useState("");
    const[DataNas, setDataNas] = useState("");
    const[eCivil,seteCivil] = useState("");
    const[DataCad,setDataCad] = useState("");
    const[Raca,setRaca] = useState("");
    const[PIS,setPis] = useState("");
    const[Escolaridade,setEscolaridade] = useState("");
    const[nEscola, setnEscola] = useState("");
    const[dataEscola,setdataEscola] = useState("")
    const[CTPS,setCTPS] = useState("");
    const[CTPSSerie,setCTPSSeria] = useState("");
    const[CTPSUF,setCTPSUF] = useState("");
    const[CTPSdata,setCTPSdata] = useState("");
    const[CMilitar,setCMilitar] = useState("");
    const[CMilitarSerie,setCMilitarSerie] = useState("");
    const[CMilitarCategoria] = useState("");
    const[nPai,setnPai] = useState("");
    const[Naturalidade,setNaturalidade] = useState("");
    const[NatuUF,setNatuUF] = useState("");
    const[Nacionalidade,setNacionalidade] = useState("");
    const[SalarioHora,setSalarioHroa] = useState("");
    const[Funcao,setFuncao] = useState("");
    const[dataAdm,setdataAdm] = useState("");
    const[horasSEM,sethorasSEM] = useState("");
    const[horasAlmoco,sethorasAlmoco] = useState("");
    const[TEleitor,setTEleitor] = useState("");
    const[TEZona,setTEZona] = useState("");
    const[TESecao,setTESecao] = useState("");
    const[TEleitorData,setTEleitorData] = useState("");
    const[nConjugue,setnConjugue] = useState("");
    const[nDependentes,setnDependentes] = useState("");
    const[nFilhos,setnFilhos] = useState("");*/
    // ^Todas AS variaveis de empregação basica
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
                    <td><button onClick={() => handleUserButtonClick(user.id)}>{user.nome}</button></td>
                    <td><button onClick={() => handleUserButtonClick(user.id)}>{user.CPF}</button></td>
                    <td><button onClick={() => handleUserButtonClick(user.id)}>{user.Endereco}</button></td>
                    <td><button onClick={() => handleUserButtonClick(user.id)}>{user.nEnum}</button></td>
                    <td><button onClick={() => handleUserButtonClick(user.id)}>{user.PIS}</button></td>
                    <td><button onClick={() => handleUserButtonClick(user.id)}>{user.Funcao}</button></td>
                    <td><button onClick={() => handleUserButtonClick(user.id)}>{user.SalarioHora}</button></td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}

export default FuncList;

