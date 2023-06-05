import { db } from "../../config/firebaseConfig/firebaseConfig";
import { collection, doc, getDocs, setDoc, addDoc } from 'firebase/firestore'; 
import React, { useEffect, useState } from "react";
import "../../App.css"


function CreateUsuario({ID, fecharModal }){
    //todas as informações do usuario para ele poder logar no sistema
    const[nome,setNome] = useState("");
    const[CPF,setCPF] = useState("");
    const[email,setEmail] = useState("");
    const[dataNas,setDataNas] = useState("");
    const[dataEnt,setDataEnt] = useState("");
    const[senha,setSenha] = useState("");

    //variaveis para poder entrar no banco de dados
    const[users,setUsers] = useState([]);
    const[usersLoaded,setUsersLoaded] = useState(false);
    const[loading,setLoading] = useState(true);
    //useEffect para pegar os usuarios e jogar na array
    useEffect(() => 
    {
        const getUsers = async () => {
            try{
                const data = await getDocs(collection(db,"Usuarios"));
                const usersData = data.docs.map((doc) => ({...doc.data(), id : doc.id}));

                setUsers(usersData);
                setUsersLoaded(true);
            }catch(error){
                alert("Erro ao buscar os usuarios" + error);
            }finally{
                setLoading(false);
            }
        }
        getUsers();
    }, []);
    //useEffect que vai vereficar se o ID tem alguma informação e se os usuarios ja foram puxados do banco, caso seja verdadeira vai puxar os dados do funcionario 
    useEffect(() => {
        
        if(ID !== null || ID !== "" || typeof ID !== "undefined" || (typeof ID !== "object" && Object.keys(ID).length !== 0) && usersLoaded)
        {
            getInfo();
        }
    }, [usersLoaded]);

    //função que vai puxar as informações do usuario
    async function getInfo(){
        const user = users.find(user => user.id === ID)
        if(user){
            setNome(user.NOME);
            setCPF(user.CPF);
            setEmail(user.EMAIL);
            setDataNas(user.DATANAS);
            setDataEnt(user.DATAENT);
            setSenha(user.SENHA);
        }
    }

    if(loading)
    {
        return(
            <div className="centralize">
                <h1>Carregando</h1>
            </div>
        );
    }

    function preencherCampos()
    {

        if(nome === ("") && CPF === ("") && email  === ("") && CPF  === ("") 
            && dataNas  === ("") && dataEnt  === ("") )
            {
                alert("Preencha todos os Campos");
            }else{
                handleSaveUser();
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
    function handleSaveUser()
    {
        if(ID === null || ID === "" || typeof ID === "undefined" || (typeof ID === "object" && Object.keys(ID).length === 0))
        {
            saveUser();
        }
        else{
            updateUser();
        }
    }
    async function updateUser(){
        try{
            setLoading(true);
            const user = await setDoc(doc(db,"Usuarios",ID), {
                NOME: nome,
                CPF: CPF,
                EMAIL: email,
                SENHA: senha,
                DATANAS: dataNas,
                DATAENT: dataEnt,
            })
            alert("Usuario Atualizado com sucesso");
        }catch(error)
        {
            alert("Ocorreu um erro ao atualzar o usuario : "+ error );
        }finally{
            setLoading(false);
        }
    }
    async function saveUser()
    {
        const findEmail = users.find((user) => email === user.EMAIL);
        if(findEmail)
        {
            alert("Email já utilizado");
        }else{
            try{
                setLoading(true);
                verifyCPF(CPF);
                const user = await addDoc(collection(db,"Usuarios"), {
                    NOME: nome,
                    CPF: CPF,
                    EMAIL: email,
                    SENHA: CPF,
                    DATANAS: dataNas,
                    DATAENT: dataEnt,
                });
                alert("Usuario salvo com Sucesso. A senha como padrão esta o CPF");
            }catch(error){
                alert("Ouve um Erro ao Salvar o Usuario" +error);
            }finally{
                setLoading(false)
            }
        }
    }
    function handleReload()
    {
        fecharModal();
    }

    return(
        <div className="modal-cru">
        <div class="header">
          <div class="header-buttons">
            <button class="save-button" onClick={preencherCampos}>Salvar</button>
            <button class="exit-button" onClick={handleReload}>Sair</button>
          </div>
        </div>
                <label>Nome: </label>
                <input type="text" value={nome} placeholder="Nome Completo" onChange={(e) => setNome(e.target.value)}></input>
                <label> CPF: </label>
                <input type="text" value={CPF} placeholder="CPF" onChange={(e) => setCPF(e.target.value)}></input>
                <br></br>
                <label> E-mail: </label>
                <input type="text" value={email} placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}></input>
                <label> Data de Nascimento: </label>
                <input type="date" value={dataNas} onChange={(e) => setDataNas(e.target.value)}></input>
                <label> Data de Entrada: </label>
                <input type="date" value={dataEnt} onChange={(e) => setDataEnt(e.target.value)}></input>
        </div>

    );
}

export default CreateUsuario;