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
const[eCivil,setECivil] = useState("");
const[CEP,setCEP] = useState("");
const[tel,setTel] = useState("");
const[UF,setUF] = useState("");
const[nMae, setnMae] = useState("");
const[nPai, setnPai] = useState("");
const[Nat,setNat] = useState("");
const[ufNat, setUFNat] = useState("");
const[Nacio,setNacio] = useState("");
const[Escolaridade,setEscolaridade] = useState("");
const[nEscolaridade,setnEsolaridade] = useState("");
const[EEXP,setEEXP] = useState("");

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
  <h1>tomara que funcione</h1>
  <div>
    <div>
      <label>Informações Pessoais</label>
      <input type="text" class="modal-input" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input type="text" class="modal-input" placeholder="CPF" value={CPF} onChange={(e) => setCPF(e.target.value)} />
      <input type="date" class="modal-input" placeholder="Data Nascimento" value={DataNas} onChange={(e) => setDataNas(e.target.value)} />
      <input type='text' placeholder='TELEFONE PARA CONTATO' value={tel} onChange={(e) => setTel(e.target.value)}></input>
      <input type='text' placeholder='ESTADO CIVIL' value={eCivil} onChange={(e) =>setECivil(e.target.value)}></input>
      <input type='text' placeholder='Nome Mãe' value={nMae} onChange={(e) => setnMae(e.target.value)}></input>
      <input type='text' placeholder='Nome Pai' value={nPai} onChange={(e) => setnPai(e.target.value)}></input>
      <input type='text' placeholder='Naturalidade' value={Nat} onChange={(e) => setNat(e.target.value)}></input>
      <input type='text' placeholder='UF' value={ufNat} onChange={(e) => setUFNat(e.target.value)}></input>
      <input type='text' placeholder='Nacionalidade' value={Nacio} onChange={(e) => setNacio(e.target.value)}></input>
      <label>Logradouro</label>
      <input type="text" class="modal-input" placeholder="Endereço" value={Endereco} onChange={(e) => setEndereco(e.target.value)} />
      <input type="text" class="modal-input" placeholder="Numero" value={eNum} onChange={(e) => seteNum(e.target.value)} />
      <input type="text" class="modal-input" placeholder="Cidade" value={Cidade} onChange={(e) => setCidade(e.target.value)} />
      <input type='text' placeholder='CEP' value={CEP} onChange={(e) => setCEP(e.target.value)}></input>
      <input type='text' placeholder='UF' value={UF} onChange={(e) => setUF(e.target.value)}></input>
      <label>Escolaridade</label>
      <input type='text' placeholder='Escolaridade' 
      value={Escolaridade} onChange={(e) => setEscolaridade(e.target.value)}></input>
      <input type='text' placeholder='n Escolaridade' value={nEscolaridade} onChange={(e) => setnEsolaridade(e.target.value)}></input>
      <input type='text' placeholder='Data de Expedição' value={EEXP} onChange={(e) => setEEXP(e.target.value)}></input>
      <label>Informações de Cargo</label>
      <input type='text' placeholder='Salario Hora' ></input>
      <button onClick={AddFuncionario}>Adicionar Funcionario</button>
    </div>
  </div>
</div>

  );
}

export default CreateFuncionario;