import './CreateFuncionarioStyle.css'
import { db } from '../../config/firebaseConfig/firebaseConfig';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';  
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

  const userCollectionRef = collection(db,"funcionarios");

  const[usersLoaded,setUsersLoaded] = useState(false);
  const[userExist,setUserExist] = useState(false);
  const[loading,setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try{
        const data = await getDocs(userCollectionRef);
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
      console.log("Atualizou os dados", nome,CPF);
    }
  }

  if(loading){
    return <h1>Carregando Usuario</h1>
  }


  async function AddFuncionario()
  {
    const user = await setDoc(doc(db,'funcionarios',userID ),{
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
        <input type='text' placeholder='n Escolaridade' value={nEscolaridade} onChange={(e) => setnEscolaridade(e.target.value)}></input>
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