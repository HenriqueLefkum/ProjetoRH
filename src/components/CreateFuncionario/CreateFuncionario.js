import './CreateFuncionarioStyle.css'
import { db } from '../../config/firebaseConfig/firebaseConfig';
import { collection, doc , getDocs, setDoc, addDoc } from "firebase/firestore";
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
  const[nEscolaridade,setnEscolaridade] = useState("");
  const[EEXP,setEEXP] = useState("");
  

  const[users,setUsers] = useState([]);
  const[usersLoaded,setUsersLoaded] = useState(false);
  const[loading,setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try{
        const data = await getDocs(collection(db,"funcionarios"));
        setUsers(data.docs.map((doc) => ({...doc.data(), id : doc.id})));
        setUsersLoaded(true);
        console.log("Passou pelo banco");
      }catch(error){
        alert("Erro ao buscar os usuarios", error);
      }finally{
        setLoading(false);
      }
    }
    //executa a função que chamamos
    getUsers(); 
    console.log("Saiu do banco");
  }, []);

  useEffect(() => {
    if (userID !== null && usersLoaded) {
      console.log("Entrou no getinfo");
      getInfo();
    }
  }, [userID, usersLoaded]);
    
  function getInfo() {
    const user = users.find(user => user.id === userID);
    console.log("entrou na vereficação");
    if (user){
      setNome(user.NOME);
      setCPF(user.CPF);
      setEndereco(user.ENDERECO);
      seteNum(user.ENUM);
      setCidade(user.CIDADE);
      setDataNas(user.DATANAS);
      setECivil(user.ECIVIL);
      setCEP(user.CEP);
      setTel(user.TEL);
      setUF(user.UF);
      setnMae(user.NMAE);
      setnPai(user.NPAI);
      setNat(user.NAT);
      setUFNat(user.UFNAT);
      setNacio(user.NACIO);
      setEscolaridade(user.ESCOLARIDADE)
      setnEscolaridade(user.NESCOLARIDADE);
      setEEXP(user.EEXP);
    }
  }

  const dataFuncionario = {
    NOME: nome,
      CPF : CPF,
      ENDERECO: Endereco,
      ENUM : eNum,
      CIDADE : Cidade,
      DATANAS: DataNas,
      ECIVIL: eCivil,
      CEP: CEP,
      TEL: tel,
      UF: UF,
      NMAE: nMae,
      NPAI: nPai,
      NAT: Nat,
      UFNAT: ufNat,
      NACIO: Nacio,
      ESCOLARIDADE: Escolaridade,
      NESCOLARIDADE: nEscolaridade,
      EEXP: EEXP
  }

  if(loading){
    return <h1>Carregando Usuario</h1>
  }
   
  function handleSaveUser(){
    if (userID === null || userID === "" || typeof userID === "undefined")
    {
      addFuncionario();
    }else{
      saveFuncionario();
    }
  }
  async function addFuncionario()
  {
    try{
      setLoading(true);
      const user = await addDoc(collection(db,"funcionarios"),dataFuncionario);
      alert("Funcionario Criado com Sucesso");
    }catch(error){
      alert("Ouve um Erro ao criar o funcionario",error);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  }
  async function saveFuncionario()
  {
    if (userID != null || userID != "" || typeof userID != "undefined"){
      try{
        setLoading(true);
        const user = await setDoc(doc(db,"funcionarios",userID  ),dataFuncionario);
        alert("Funcionario Atualizado com Sucesso");
        alert(userID);
        handleReload();
      }catch(error){
        setLoading(false);
        alert("Ocorreu um Erro ao Atualizar o Funcionario");
      }finally{
      setLoading(false)
      }
    }
  }
  function handleReload()
  {
    window.location.reload();
  }

    
  return(
<div class="modal">
  <div class="header">
    <div class="header-buttons">
      <button class="save-button" onClick={handleSaveUser}>Salvar</button>
      <button class="exit-button"onClick={handleReload}>Sair</button>
    </div>
  </div>
  <div>
    <div>
      <div className='info-label'>
        <label class="label">Informações Pessoais</label><br/>
        <input type="text" class="modal-input" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="text" class="modal-input" placeholder="CPF" value={CPF} onChange={(e) => setCPF(e.target.value)} />
        <input type="date" class="modal-input" placeholder="Data Nascimento" value={DataNas} onChange={(e) => setDataNas(e.target.value)} />
        <input type='text' class="modal-input" placeholder='TELEFONE PARA CONTATO' value={tel} onChange={(e) => setTel(e.target.value)}></input>
        <input type='text' class="modal-input" placeholder='ESTADO CIVIL' value={eCivil} onChange={(e) =>setECivil(e.target.value)}></input>
        <input type='text' class="modal-input" placeholder='Nome Mãe' value={nMae} onChange={(e) => setnMae(e.target.value)}></input>
        <input type='text' class="modal-input" placeholder='Nome Pai' value={nPai} onChange={(e) => setnPai(e.target.value)}></input>
        <input type='text' class="modal-input" placeholder='Naturalidade' value={Nat} onChange={(e) => setNat(e.target.value)}></input>
        <input type='text' class="modal-input" placeholder='UF' value={ufNat} onChange={(e) => setUFNat(e.target.value)}></input>
        <input type='text' class="modal-input" placeholder='Nacionalidade' value={Nacio} onChange={(e) => setNacio(e.target.value)}></input>
      </div>
      <div className='info-label'>
        <label class="label">Logradouro</label><br/>
        <input type="text" class="modal-input" placeholder="Endereço" value={Endereco} onChange={(e) => setEndereco(e.target.value)} />
        <input type="text" class="modal-input" placeholder="Numero" value={eNum} onChange={(e) => seteNum(e.target.value)} />
        <input type="text" class="modal-input" placeholder="Cidade" value={Cidade} onChange={(e) => setCidade(e.target.value)} />
        <input type='text' class="modal-input" placeholder='CEP' value={CEP} onChange={(e) => setCEP(e.target.value)}></input>
        <input type='text' class="modal-input" placeholder='UF' value={UF} onChange={(e) => setUF(e.target.value)}></input>
        </div>
        <div>
        <label class="label">Escolaridade</label><br/>
        <input type='text' class="modal-input" placeholder='Escolaridade' value={Escolaridade} onChange={(e) => setEscolaridade(e.target.value)}></input>
        <input type='text' class="modal-input" placeholder='n Escolaridade' value={nEscolaridade} onChange={(e) => setnEscolaridade(e.target.value)}></input>
        <input type='text' class="modal-input" placeholder='Data de Expedição' value={EEXP} onChange={(e) => setEEXP(e.target.value)}></input>
      </div>
      <div className='info-label'>
        <label class="label">Informações de Cargo</label><br/>
        <input type='text' class="modal-input" placeholder='Salario Hora'></input>
      </div>
    </div>
  </div>
</div>

  );
}

export default CreateFuncionario;