import './CreateFuncionarioStyle.css'
import { db } from '../../config/firebaseConfig/firebaseConfig';
import { collection, getDocs, setDoc } from 'firebase/firestore';
import { React, useState, useEffect } from 'react';
function CreateFuncionario({userID})
{
//isso é tudo que sera usado como informação do funcionario mas não é necessario preencher tudo
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
const[nFilhos,setnFilhos] = useState("");
const[users,setUsers] = useState([]);

const userCollectionRef = collection(db,"funcionarios");

const[usersLoaded,setUsersLoaded] = useState(false);

useEffect(() => {
  //criando uma variavel asyncrona para pegar os usuarios
  const getUsers = async () => {
  //usando getdocs para puxar o firestore
  const data = await getDocs(userCollectionRef);
  //setando os usuarios em uma array durante que o id do documento seja igual
  setUsers(data.docs.map((doc) => ({...doc.data(), id : doc.id})));
  setUsersLoaded(true);
  console.log("Passou pelo banco");
};
  //executa a função que chamamos
  getUsers();
}, []);

useEffect(() => {
  if(userID !== null && usersLoaded)
  {
    getInfo();
  }
})
  
function getInfo() {
  const user = users.find(user => user.id === userID);
  console.log("entrou na vereficação");
  if (user){
    setNome(user.nome);
    setCPF(user.CPF);
    console.log("Atualizou os dados", nome,CPF);
  }
}


async function AddFuncionario()
{
  const user = await setDoc(userCollectionRef,{
    nome,
    CPF,
  })
}

  
return(
  <div class="modal">
  <h1 class="modal-title">tomara que funcione</h1>
  <div class="modal-content">
    <div class="modal-input-container">
      <label>Informações Pessoais</label>
      <input type="text" class="modal-input" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input type="text" class="modal-input" placeholder="CPF" value={CPF} onChange={(e) => setCPF(e.target.value)} />
      <input type="text" class="modal-input" placeholder="Data Nascimento" value={DataNas} onChange={(e) => setDataNas(e.target.value)} />
      <label>Logradouro</label>
      <input type="text" class="modal-input" placeholder="Endereço" value={Endereco} onChange={(e) => setEndereco(e.target.value)} />
      <input type="text" class="modal-input" placeholder="Numero" value={eNum} onChange={(e) => seteNum(e.target.value)} />
      <input type="text" class="modal-input" placeholder="Cidade" value={Cidade} onChange={(e) => setCidade(e.target.value)} />
    

      <button onClick={AddFuncionario}>Adicionar Funcionario</button>
    </div>
  </div>
</div>

  );
}

export default CreateFuncionario;