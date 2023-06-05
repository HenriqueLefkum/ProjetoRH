import { db } from "../../config/firebaseConfig/firebaseConfig";
import React, {useContext, useState, useEffect} from "react";
import { getDocs, setDoc, collection, doc } from "firebase/firestore";
import { UserContext } from "../../config/ContextAPI/ContextAPI";

function ChangePassword()
{
    const { userID } = useContext(UserContext);
    const [usuarios,setUsuarios] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const [senha,setSenha] = useState("");
    const [senhaNova,setSenhaNova] = useState("");
    const [senhaNovaConfirmar,setSenhaNovaConfirmar] = useState("");
    const [loading, setLoading] = useState(true);
    const [usersLoaded, setUsersLoaded] = useState(false);
    useEffect(() => {
        async function fetchData(){
            try{
                setLoading(true)
                const data = await getDocs(collection(db,"Usuarios"));
                const dataUsuario = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
                setUsuarios(dataUsuario);
                setUsersLoaded(true);
            }catch(error)
            {
                alert("Ocorreu um Erro ao carregar o Usuario" + error);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    },[]);

    useEffect(() => {
        if(usersLoaded)
        {
            const findUser = usuarios.find((user) => user.id === userID);
            console.log(findUser);
            console.log(userID);
            if(findUser)
            {
                
                setUsuario(findUser);
            }
        }
    }, [usersLoaded])

    const handlePasswordChange = () => 
    {
        if(senha === usuario.SENHA){
            if(senhaNova === senhaNovaConfirmar)
            {
                
                if(senhaNova != senha)
                {
                    setPassword();
                }else{
                    alert("Nova senha e senha atual são iguais");
                }
            }else{
                alert("As senhas não são iguais");
            }
        }else{
            console.log(usuario.senha);
            alert("senha atual incorreta");
        }
        
    }

    async function setPassword()
    {
        try{
            setLoading(true);
            const user = await setDoc(doc(db,"Usuarios",userID),{
            NOME: usuario.NOME,
            CPF: usuario.CPF,
            SENHA: senhaNova,
            DATAENT: usuario.DATAENT,
            DATANAS: usuario.DATANAS,
            EMAIL: usuario.EMAIL,
        });
            alert("Senha atualizada com Sucesso");
        }catch(error){
            alert("Ocorreu um Erro ao atualizar a senha" + error);
        }finally{
            window.location.reload();
        }
    }

    return(
        <div className="modal-senha">
            <label>Senha Atual: </label>
            <input type="password" required onChange={(e) => setSenha(e.target.value)}></input>
            <br></br>
            <label>Nova Senha: </label>
            <input type="password" required onChange={(e) => setSenhaNova(e.target.value)}></input>
            <br></br>
            <label>Confirmar Nova Senha: </label>
            <input type="password" required onChange={(e) => setSenhaNovaConfirmar(e.target.value)}></input>

            <button onClick={handlePasswordChange}>Alterar Senha</button>
        </div>
    )
}

export default ChangePassword;