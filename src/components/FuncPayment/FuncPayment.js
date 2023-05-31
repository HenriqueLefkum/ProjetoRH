import "../../App.css"
import React, { useEffect, useState } from "react"
import { db } from "../../config/firebaseConfig/firebaseConfig"
import "../../App.css"
import { collection, getDocs, addDoc} from "firebase/firestore";
import EstabList from "../../pages/EstabList";
function FuncPayment({estabID, mesSelecionado, anoSelecionado})
{
    console.log(estabID);
    //constantes para a tabela Pagamento
    const[nomeFuncionario,setNomeF] = useState("");
    const[dias,setDias] = useState("");
    const[salHora,setSalHora] = useState("");
    const[salHoraEx, setSalHoraEx] = useState("");
    const[diasEx, setDiasEx] = useState("");
    
    //funções e constantes  para o funcionamento do banco de dados
    const[funcionarios,setFuncionarios] = useState([]);
    const[funcionariosFiltrados, setFFiltrado] = useState([]);
    const[pagamentos,setPagamentos] = useState([]); 
    const[achouPagamento,setAchouPagamento] = useState(false);
    const[loading,setLoading] = useState(false);
    const[usersLoaded,setUsersLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const dataFuncionario = await getDocs(collection(db, "funcionarios"));
            const funcionariosData = dataFuncionario.docs.map((doc) => ({ NOME : doc.data().NOME, SALHORA: doc.data().SALHORA, VINCULADO: doc.data(). VINCULADO, SALEXTRA: doc.data().SALEXTRA }));
            setFuncionarios(funcionariosData);

            const dataPagamento = await getDocs(collection(db,"Pagamentos"));
            const pagamentoData = dataPagamento.docs.map((doc => ({...doc.data(), id: doc.id})));
            setPagamentos(pagamentoData);
            setUsersLoaded(true);
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
            const findFuncionario = funcionarios.filter((funcionario) => funcionario.VINCULADO === estabID);
            setFFiltrado(findFuncionario); 
            const findPagamento = pagamentos.filter((pagamento) => pagamento.ESTABID === estabID && pagamento.MES === mesSelecionado);
            if(findPagamento)
            {
                setPagamentos(findPagamento);
                setAchouPagamento(true);
            }
        }
      }, [usersLoaded]);

      const [diasTrabalhados, setDiasTrabalhados] = useState({});
      const [diasExtrasTrabalhados, setDiasExtrasTrabalhados] = useState({});
    
      const handleDiasTrabalhadosChange = (event, user) => {
        const { value } = event.target;
        setDiasTrabalhados((prevState) => ({
          ...prevState,
          [user.id]: parseInt(value),
        }));
      };
    
      const handleDiasExtrasTrabalhadosChange = (event, user) => {
        const { value } = event.target;
        setDiasExtrasTrabalhados((prevState) => ({
          ...prevState,
          [user.id]: parseInt(value),
        }));
      };

      function HandleSaveButton()
      {
        if(!achouPagamento)
        {
            addTable()
        }
      }
      async function addTable(nome, dias, salHora, diasex, horaex)
      {
        try{
            setLoading(true);
            const user = await addDoc(collection(db,"Pagamentos"),{
                    ESTABID: estabID,
                    FUNCNOME: nome,
                    DIASTRABALHADO: dias,
                    SALHORA: salHora,
                    DIASEX: diasex,
                    HORAEX: horaex,
                } );
            alert("Funcionario Criado com Sucesso");
          }catch(error){
            alert("Ouve um Erro ao criar o funcionario",error);
            setLoading(false);
          }finally{
            setLoading(false);
          }
      }

      if(loading)
      {
        return(
            <div className="centralize">
                <h1>Carregando...</h1>
            </div>
        );
      }
    
    return(
        <div className="modal">
            <div className="header">
                <div className="header-buttons">
                    <button className="exit-button">Sair</button>
                </div>
            </div>
            <div>
                <div>
                <table>
            <thead>
                <tr>
                    <th>NOME DO FUNCIONARIO</th>
                    <th>DIAS TRABALHADOS</th>
                    <th>SALARIO/h</th>
                    <th>DIAS EXTRAS</th>
                    <th>SALARIO/h/ex</th>
                    <th>AÇÃO</th>
                </tr>
            </thead>
            <tbody>
                {funcionariosFiltrados.map((user) => (
                    <tr key={user}>
                        <td>{user.NOME}</td>
                        <td><input
                            type="number"
                            value={diasTrabalhados[user.id] || ''}
                            onChange={event => handleDiasTrabalhadosChange(event, user)}
                            /></td>
                        <td>{user.SALHORA}</td>
                        <td><input
                            type="number"
                            value={diasExtrasTrabalhados[user.id] || ''}
                            onChange={event => handleDiasExtrasTrabalhadosChange(event, user)}
                            /></td>
                        <td>{user.SALEXTRA}</td>
                        <td><button className="save-button" onClick={(e) => HandleSaveButton(user.NOME, dias, user.SALHORA)}>Salvar</button> </td>
                    </tr>
                ))}
            </tbody>
            </table>
                </div>
            </div>
    </div>
    );
}

export default FuncPayment;