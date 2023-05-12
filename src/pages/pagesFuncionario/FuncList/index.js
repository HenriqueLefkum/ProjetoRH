//A intenção aqui é mostrar a lista dos funcionarios com as informações pertinentes
//talvez mais pro futuro adicionar as opções do que mostrar e tambem para mandar pro excel ou imprimir em pdf {users.map((user) => (
// <tr key={user.id}></tr>
import React, { useState } from 'react'
import {addDocs, getDocs , collections } from  'firebase/firestore'
import CreateFuncionario from '../../../components/CreateFuncionario/CreateFuncionario';
import ReactModal from 'react-modal';

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

    const[ModalIsOpen, setModalIsOpen] = useState(false);

    const handleOpenModal = () =>
    {
        setModalIsOpen(true);
    }
    const handleCloseModal = () => {
        setModalIsOpen(false);
    }

    return(

        <div className='content-box'>
            <div className='button-box'>
                <button onClick={handleOpenModal}>Add</button>
                <ReactModal isOpen={ModalIsOpen} onRequestClose={handleCloseModal}>
                    <CreateFuncionario />
                </ReactModal>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CPF</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><button>Nome</button></td>
                            <td><button>Email</button></td>
                            <td><button>CPF</button></td>
                        </tr>
                        </tbody>
                </table>
            </div>
        </div>
    );
}

export default FuncList;