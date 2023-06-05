import { useEffect, useState } from "react";
import "../../App.css";
import ReactModal from "react-modal";
import FuncPayment from "./FuncPayment";
import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig/firebaseConfig";

function FuncPaymentStart({estabID, handleCloseModal})
{
    //variaveis uteis para o funcionamento do código
    const[mes,setMes] = useState("");
    const[ano,setAno] = useState("");

    //variaveis para o funcionamento da lógica do banco
    const[funcionarios,setFuncionarios] = useState([]);
    const[usersLoaded,setUsersLoaded] = useState(false);
    const[funcionariosVinculados, setFuncionariosVinculados] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const dataFuncionario = await getDocs(collection(db, "funcionarios"));
            const funcionariosData = dataFuncionario.docs.map((doc) => ({id: doc.id, NOME : doc.data().NOME, SALHORA: doc.data().SALHORA, VINCULADO: doc.data(). VINCULADO, CPF: doc.data().CPF, FUNCAO: doc.data().FUNCAO }));
            setFuncionarios(funcionariosData);
            } catch (error) {
            alert("Ocorreu um erro ao carregar os usuários: " + error);
            } finally {
            setUsersLoaded(true);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if(usersLoaded)
        {
           const findFuncionario = funcionarios.filter((user) => user.VINCULADO === estabID);
            setFuncionariosVinculados(findFuncionario);
        }
    }, [usersLoaded])
    //abre o modal e fecha o modal
    const[ModalIsOpen, setModalIsOpen] = useState(false);
    const[selectedID,setSelectedID] = useState('');
    const[idSelecionado,setIDSelecionado] = useState("");
    const handleOpenModal = (id) =>
    {
        if(mes != "" && ano != ""){
            console.log(mes,ano )
        setIDSelecionado(id);
        setModalIsOpen(true);
        }else{
            alert("Preencha os Espaço de Mes e ano corretamente")
        }
    }
    const handleCloseModal2 = () => {
        setModalIsOpen(false);
        setSelectedID('');
    }

    function handleReload()
    {
        handleCloseModal();
    }
    return(
        <div className="modal">
            <div className="header">
                <div className="header-buttons">
                    <select  className='modal-input' onChange={(e) => setMes(e.target.value)} value={mes}>
                        <option>Vazio</option>
                        <option>Janeiro</option>
                        <option>Fevereiro</option>
                        <option>Marco</option>
                        <option>Abril</option>
                        <option>Maio</option>
                        <option>Junho</option>
                        <option>Julho</option>
                        <option>Agosto</option>
                        <option>Setembro</option>
                        <option>Outubro</option>
                        <option>Setembro</option>
                        <option>Dezembro</option>
                    </select>
                    <select  className='modal-input' onChange={(e) => setAno(e.target.value)} value={ano}>
                        <option>Vazio</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                    </select>
                    <button className="exit-button"onClick={handleReload}>Sair</button>
                </div>
            </div>
            <div>
                <div className='table-container'>
                
                <table>
            <thead>
                <tr>
                    <th>NOME DO FUNCIONARIO</th>
                    <th>CPF</th>
                    <th>FUNCAO</th>
                    <th>ESTABELECIMENTO</th>
                    <th>SALARIO/h</th>
                    <th>AÇÃO</th>
                </tr>
            </thead>
            <tbody>
                {funcionariosVinculados.map((user) => (
                    <tr key={user}>
                        <td>{user.NOME}</td>
                        <td>{user.CPF}</td>
                        <td>{user.FUNCAO}</td>
                        <td>{user.VINCULADO}</td>
                        <td>{user.SALHORA}</td>
                        <td><button onClick={(e)=> handleOpenModal(user.id)}>Pagar</button></td>
                    </tr>
                ))}
            </tbody>
            </table>
                    <ReactModal isOpen={ModalIsOpen} onRequestClose={handleCloseModal2} className="custom-modal" style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } }}>
                            <FuncPayment estabID={estabID} mesSelecionado={mes} anoSelecionado={ano}
                            funcID={idSelecionado} handleCloseModal={handleCloseModal2}/>
                            </ReactModal>
                </div>
            </div>
        </div>
    )
}

export default FuncPaymentStart