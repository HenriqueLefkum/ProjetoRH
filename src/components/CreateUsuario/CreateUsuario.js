import { db } from "../../config/firebaseConfig/firebaseConfig";
import React from "react";
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'; 
import { useEffect, useState } from "react";
import "../../App.css"

function CreateUsuario({userID}){
    //todas as informações do usuario para ele poder logar no sistema
    const[nome,setNome] = useState("");
    const[CPF,setCPF] = useState("");
    const[email,setEmail] = useState("");
    const[dataNas,setDataNas] = useState("");
    const[dataEnt,setDataEnt] = useState("");

    //variaveis para poder entrar no banco de dados
    const[users,setUsers] = useState([]);
    const userCollectionRef = collection(db,"usuarios");
    const[usersLoaded,setUsersLoaded] = useState(false);
    const[loading,setLoading] = useState(true);
    //useEffect para pegar os usuarios e jogar na array
    useEffect(() => 
    {
        const getUsers = async () => {
            try{
                const data = await getDocs(userCollectionRef);
                setUsers(data.docs.map((doc) => ({...doc.data() ,id: doc.id})));
                setUsersLoaded(true);
            }catch(error){
                alert("Erro ao buscar os usuarios", error);
            }finally{
                setLoading(false);
            }
        }
        getUsers();
    }, []);
    //useEffect que vai vereficar se o userID tem alguma informação e se os usuarios ja foram puxados do banco, caso seja verdadeira vai puxar os dados do funcionario 
    useEffect(() => {
        if(userID != null && usersLoaded)
        {
            getInfo();
        }
    })

    //função que vai puxar as informações do usuario
    async function getInfo(){
        const user = users.find(user => user.id === userID)
        if(user){
            setNome(user.NOME);
            setCPF(user.CPF);
            setEmail(user.EMAIL);
            setDataNas(user.DATANAS);
            setDataEnt(user.DATAENT);
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
    async function saveUser()
    {
        try{
            setLoading(true);
            const user = await setDoc(doc(db,'usuarios',userID),
            {
                NOME: nome,
                CPF: CPF,
                EMAIL: email,
                SENHA: CPF,
                DATANAS: dataNas,
                DATAENT: dataEnt,
            })
            alert("Usuario salvo com Sucesso. A senha como padrão esta o CPF");
        }catch(error){
            alert("Ouve um Erro ao Salvar o Usuario", error);
        }finally{
            setLoading(false)
        }
    }
        return(
        <div>
            <input type="text" value={nome} placeholder="Nome Completo" onChange={(e) => setNome(e.target.value)}></input>
            <input type="text" value={CPF} placeholder="CPF" onChange={(e) => setCPF(e.target.value)}></input>
            <input type="text" value={email} placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}></input>
            <input type="date" value={dataNas} onChange={(e) => setDataNas(e.target.value)}></input>
            <input type="date" value={dataEnt} onChange={(e) => setDataEnt(e.target.value)}></input>
            <button onClick={saveUser}></button>
        </div>
    )
}

export default CreateUsuario;