import "./login.css"
import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../config/ContextAPI/ContextAPI";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig/firebaseConfig";
import { Navigate } from "react-router-dom";
function Login()
{  
    const { updateUserID, userID} = useContext(UserContext);
    const [usuarios,setUsuarios] = useState([]);
    const [email,setEmail] = useState("");
    const [senha,setSenha] = useState("");
    const [isLogged,setIsLogged] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function fetchUser(){
            const dataUser = await getDocs(collection(db,"Usuarios"));
            const UserData = dataUser.docs.map((doc) => ({
                id: doc.id,
                EMAIL: doc.data().EMAIL,
                SENHA: doc.data().SENHA,
            }));
            setUsuarios(UserData);
        }
        fetchUser();
    }, []);


    const handleLogin = () => {
        const findUser = usuarios.find((user) => user.EMAIL === email);
        if(findUser)
        {
            if(findUser.SENHA === senha)
            {
                updateUserID(findUser.id);
                setIsLogged(true);
                
            }else{
                alert("Senha Incorreta");
            }
        }else{
            alert("usuario não encontrado");
        }
    }

    if(isLogged)
    {
        console.log("logou");
        if(userID !== null){
            return(
                <Navigate to="/home"/>
            );
        }       
    }
    if(loading)
    {
        return(
        <h1>Carregando...</h1>
        )
    }

    return(
        <div id="box-content">
            <div id="container-logo">BG</div>
                <div id="container-login">
                    <label class="label" for="username">Username:</label>
                    <input class="input" type="text" onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div id="container-login">
                    <label class="label" for="password">Password:</label>
                    <input class="input" type="password" onChange={(e) => setSenha(e.target.value)}required/>
                </div>
                <button class="button-login" onClick={handleLogin}>Login</button>
        </div>
    ); 
}

export default Login;