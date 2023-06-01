import "../../App.css";
import { db } from "../../config/firebaseConfig/firebaseConfig";
import { getDocs, addDoc, doc, collection } from "firebase/firestore";
import React, { useState, useEffect } from "react";

function FuncPayment({ funcID, estabID, anoSelecionado, mesSelecionado }) {
  const [nomeFuncionario, setNomeFuncionario] = useState("");
  const [diasTrabalhados, setDiasTrabalhados] = useState("");
  const [salHora, setSalHora] = useState("");
  const [salExtra, setSalExtra] = useState("");
  const [diasExtraTrabalhado, setDiasExtraTrabalhado] = useState("");

  const [funcionarios, setFuncionarios] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataFuncionario = await getDocs(collection(db, "funcionarios"));
        const funcionariosData = dataFuncionario.docs.map((doc) => ({
          id: doc.id,
          NOME: doc.data().NOME,
          SALHORA: doc.data().SALHORA,
          SALEXTRA: doc.data().SALEXTRA,
        }));
        setFuncionarios(funcionariosData);

        const dataPagamento = await getDocs(collection(db,"Pagamento"));
        const PagamentoData = dataPagamento.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setPagamentos(PagamentoData);
        
        setUsersLoaded(true);
        setLoading(false);  
      } catch (error) {
        alert("Não foi possível criar o pagamento" + error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (usersLoaded) {
      console.log(funcionarios);
      console.log(funcID);
      const findUser = funcionarios.find((user) => user.id === funcID);

      const findTable = pagamentos.find((user) => user.ANO === anoSelecionado && user.MES === mesSelecionado && user.IDFUNCIONARIO === funcID && user.ESTABELECIMENTO === estabID);
      if(findTable)
      {
        setNomeFuncionario(findTable.NOMEFUNCIONARIO);
        setSalHora(findTable.SALHORA);
        setSalExtra(findTable.SALEXTRA);
        setDiasTrabalhados(findTable.DIASTRABALHADOS);
        setDiasExtraTrabalhado(findTable.DIASEXTRATRABALHADOS);
      }else{
        if(findUser){
          setNomeFuncionario(findUser.NOME);
          setSalHora(findUser.SALHORA);
          setSalExtra(findUser.SALEXTRA);
          console.log(findUser);
        }else{
          alert("Não foi possivel achar o Usuario")
        }
      }
      
    }
  }, [usersLoaded]);

  async function createPagamento()
  {
    try{
      setLoading(true);
      const user = await addDoc(collection(db,"Pagamento"),{
        NOMEFUNCIONARIO: nomeFuncionario,
        IDFUNCIONARIO: funcID,
        ESTABELECIMENTO: estabID,
        MES: mesSelecionado,
        ANO: anoSelecionado,
        DIASTRABALHADOS: diasTrabalhados,
        DIASEXTRATRABALHADOS: diasExtraTrabalhado,
        SALHORA: salHora,
        SALEXTRA: salExtra,
      });
      alert("Funcionario Criado com Sucesso");
    }catch(error){
      alert("Ouve um Erro ao criar o funcionario",error);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  }
  
  function handleReload()
  {
    window.location.reload();
  }
  if(loading){
    return(
      <div className="centralize">
        <h1>Carregando...</h1>
      </div>
    )
  }

  return (
    <div className="modal">
        <div class="header">
          <div class="header-buttons">
            <button class="save-button" onClick={createPagamento}>Salvar</button>
            <button class="exit-button"onClick={handleReload}>Sair</button>
          </div>
      </div>
      <input
        type="text"
        value={nomeFuncionario}
        placeholder="Nome Completo"
        readOnly
      />
      <input
        type="text"
        value={diasTrabalhados}
        placeholder="Dias Trabalhados"
        onChange={(e) => setDiasTrabalhados(e.target.value)}
      />
      <input type="text" value={salHora} readOnly />
      <input
        type="text"
        value={diasExtraTrabalhado} placeholder="Dias Extra Trabalhados"
        onChange={(e) => setDiasExtraTrabalhado(e.target.value)}
      />
      <input type="text" value={salExtra} readOnly />
    </div>
  );
}

export default FuncPayment;
