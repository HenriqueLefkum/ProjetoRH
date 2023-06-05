import './HomeStyle.css'
import { UserContext } from '../../config/ContextAPI/ContextAPI';
import React, { useContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig/firebaseConfig';
function Home()
{
  const [nome, setNome] = useState("");
  const {userID} = useContext(UserContext);
  const [users,setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);
  useEffect(() => {
    async function fetchData(){
      try{
        setLoading(true)
        const data = await getDocs(collection(db,"Usuarios"));

        const dataUsuarios = data.docs.map((doc) => ({...doc.data() , id: doc.id}));

        setUsers(dataUsuarios);
        setUsersLoaded(true)
      }catch(error){
        alert("Ocorreu um erro ao carregar o usuario");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if(usersLoaded)
    {
      const findUser = users.find((user) => user.id === userID)
      if(findUser)
      {
        setNome(findUser.NOME);
        setLoading(false);
      }
    }
  }, [usersLoaded])

  if(loading){
    return(
      <div className='centralize'>
        <h1>Carregando</h1>
      </div>
    )
  }
  return(
    <div>
      <div className='container'>
        <div className='content-box3'>
          <h1>Beyond Gods</h1>
          <h2>Bom dia, {nome}</h2>
          <p>Nenhuma atividade nova encontrada.</p>
        </div>

        <div className='content-box3'>
          <h1>Notícias</h1>
          <p>Erro ao carregar dados.</p>
        </div>
      </div>

      <div>
      </div>
    </div>

    
    );
}

export default Home;