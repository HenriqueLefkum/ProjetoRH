import '../../App.css'
import { db } from '../../config/firebaseConfig/firebaseConfig';
import { collection, doc , getDocs, setDoc, addDoc } from "firebase/firestore";
import { React, useState, useEffect } from 'react';
import axios from 'axios';
function CreateFuncionario({funcID, handleCloseModal})
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
  const[funcao,setFuncao] = useState("");
  const[salHora, setSalHora] = useState("");
  const[estabTrab,setEstabTrab] = useState("");
  const[nomeEstabelecimento,setNomeEstabalecimento] = useState("");
  

  const[users,setUsers] = useState([]);
  const[usersLoaded,setUsersLoaded] = useState(false);
  const[loading,setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try{
        const dataFuncionario = await getDocs(collection(db,"funcionarios"));
        const dataEstabelecimento = await getDocs(collection(db,"Estabelecimentos"));
        setUsers(dataFuncionario.docs.map((doc) => ({...doc.data(), id : doc.id})));
        setNomeEstabalecimento(dataEstabelecimento.docs.map((doc) => ({...doc.data(), id:doc.id})));
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
    if (funcID !== null && usersLoaded) {
      console.log("Entrou no getinfo");
      getInfo();
    }
  }, [funcID, usersLoaded]);
    
  function getInfo() {
    const user = users.find(user => user.id === funcID);
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
      setFuncao(user.FUNCAO)
      setEEXP(user.EEXP);
      setEstabTrab(user.VINCULADO);
      setSalHora(user.SALHORA);
    }
  }

  const [address, setAddress] = useState([]);

  const handleCepSubmit = async () => {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${CEP}/json/`);
        setAddress(response.data);
        setEndereco(address.logradouro);
        setCidade(address.localidade);
        setUF(address.uf);
      } catch (error) {
        console.log(error);
        setAddress(null);
      }
    };

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
      EEXP: EEXP,
      VINCULADO : estabTrab,
      SALHORA: salHora,
      SALEXTRA : salHora * 1.5,
  }

  if(loading){
    return <h1>Carregando Usuario</h1>
  }
  function preencherCampos()
  {
    if(nome === ("") || CPF === ("") || CEP  === ("") || salHora  === ("") || funcao  === ("") || tel === ("") || EEXP  === ("")){
      alert("preencha todos os campos em * : Nome, CPF , CEP , Salario/h , Funçao, Telefone e data de expedição")
    }else{
      handleSaveUser();
    }
  }
  function handleSaveUser(){
    if(funcID === null || funcID === "" || typeof funcID === "undefined")
    {
      addFuncionario();
    }else{
      saveFuncionario();
    }
  }
  
  
  async function verifyCPF(cpf)
  {
    if(CPF.length >= 11 || CPF.length < 10)
    {
      return("CPF Invalido");
    }
      var i = 0;
      var soma;
      var resto;
      soma = 0;
      if(cpf === '00000000000')
      {
          alert("CPF invalido");
          return false;
      }
      for(i=1; i<=9;i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);

      resto = (soma * 10) % 11;

      if((resto == 10) || (resto == 11))
      {
          resto = 0
      }
      if(resto != parseInt(cpf.substring(9,10)))
      {
          alert("CPF invalido");
          return false
      }

  }
  async function addFuncionario()
  {
    const userFound = users.find((user) => user.CPF === CPF);
    if(userFound)
    {
        alert("CPF já utilizado");
    }else
    {   
      try{
        setLoading(true);
        await verifyCPF(CPF);
        const user = await addDoc(collection(db,"funcionarios"),dataFuncionario);
        alert("Funcionario Criado com Sucesso");
      }catch(error){
        alert("Ouve um Erro ao criar o funcionario",error);
        setLoading(false);
      }finally{
        setLoading(false);
      }
    }
  }
  async function saveFuncionario()
  {
    if (funcID != null || funcID != "" || typeof funcID != "undefined"){
      try{
        setLoading(true);
        const user = await setDoc(doc(db,"funcionarios",funcID),dataFuncionario);
        alert("Funcionario Atualizado com Sucesso");
        alert(estabTrab);
        handleReload();
      }catch(error){
        setLoading(false);
        alert("Ocorreu um Erro ao Atualizar o Funcionario"+ error);
      }finally{
      setLoading(false)
      }
    }
  }
  function handleReload()
  {
    handleCloseModal();
  }

    
  return(
<div className='modal-box'> 
<div class="modal">
  <div class="header">
    <div class="header-buttons">
      <button class="save-button" onClick={preencherCampos}>Salvar</button>
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
        <input type="text" class="modal-input" placeholder="Endereço" value={Endereco} onChange={(e) => setEndereco(e.target.value)} disabled="true" />
        <input type="text" class="modal-input" placeholder="Numero" value={eNum} onChange={(e) => seteNum(e.target.value)}  disabled="true"/>
        <input type="text" class="modal-input" placeholder="Cidade" value={Cidade} onChange={(e) => setCidade(e.target.value)} disabled="true" />
        <input type='text' class="modal-input" placeholder='CEP' value={CEP} onChange={(e) => setCEP(e.target.value)}/>
        <input type='text' class="modal-input" placeholder='UF' value={UF} onChange={(e) => setUF(e.target.value)} disabled="true"/>
        <button className="button-pequeno" onClick={handleCepSubmit}>Rastrear</button>
        </div>
        <div>
        <label class="label">Escolaridade</label><br/>
        <input type='text' class="modal-input" placeholder='Escolaridade' value={Escolaridade} onChange={(e) => setEscolaridade(e.target.value)}></input>
        <input type='text' class="modal-input" placeholder='n Escolaridade' value={nEscolaridade} onChange={(e) => setnEscolaridade(e.target.value)}></input>
        <input type='text' class="modal-input" placeholder='Data de Expedição' value={EEXP} onChange={(e) => setEEXP(e.target.value)}></input>
      </div>
      <div className='info-label'>
        <label class="label">Informações de Cargo</label><br/>
        <input type='text' class="modal-input" placeholder='Salario Hora' value={salHora} onChange={(e) => setSalHora(e.target.value)}></input>
        <input type ='text' class="modal-input" placeholder='Função' value={funcao} onChange={(e) => setFuncao(e.target.value)}></input>
        
          <select  className='modal-input' onChange={(e) => setEstabTrab(e.target.value)} value={estabTrab}>
            <option value='Nenhum'>Nenhum</option>
          {nomeEstabelecimento.map((estab) => (
            <option key={estab}value={estab.NOME} >{estab.NOME} </option>
          ))}
          </select>
        
        
      </div>
    </div>
  </div>
</div>
</div>   

  );
}

export default CreateFuncionario;