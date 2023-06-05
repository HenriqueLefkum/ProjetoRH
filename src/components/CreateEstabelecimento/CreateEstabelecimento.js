import { collection, doc, setDoc, addDoc, getDocs, getDoc } from "firebase/firestore";
import { db} from "../../config/firebaseConfig/firebaseConfig";
import React, {useState, useEffect} from "react";
import "../../App.css"
import axios from "axios";
function CreateEstabelecimento({userID , handleCloseModal})
{
    //informações sobre o estabelecimento
    const[nome,setNome] = useState("");
    const[nomeF,setNomeF] = useState("");
    const[Endereco,setEndereco] = useState("");
    const[eNum, seteNum] = useState("");
    const[Cidade,setCidade] = useState("");
    const[CEP,setCEP] = useState("");
    const[UF,setUF] = useState("");
    //const para as funções de carregamento e banco de dados
    const[loading,setLoading] = useState(true);
    const[estabelecimentosLoaded,setEstabelecimentosLoaded] = useState(false);
    const[estabelecimentos,setEstabelecimentos] = useState([]);
    //as informações do estabelecimento como objetos, seram passados para adicionar os dados    
    const dateEstabelecimento = {
        NOME: nome,
        NOME_FANTASIA: nomeF,
        ENDERECO: Endereco,
        NUMERO: eNum,
        CIDADE: Cidade,
        CEP: CEP,
        UF:UF
    }
    //informaçoes para a API de CEP
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
    if(loading)
    {
        <h1>Carregando</h1>
    }
    function handleReload()
    {
        handleCloseModal();
    }
    //função para buscar os usuarios
    useEffect(() => {
        const getEstabelecimentos = async () => {
            try{
                const data = await getDocs(collection(db,"Estabelecimentos"));
                setEstabelecimentos(data.docs.map((doc) => ({...doc.data(), id : doc.id})));
                setEstabelecimentosLoaded(true);
                console.log("Passou pelo banco");
            }catch(error){
                alert("Erro ao buscar os usuarios", error);
            }finally{
                setLoading(false);
            }
    }
    //executa a função que chamamos
    getEstabelecimentos(); 
    console.log("Saiu do banco");
    }, []);
    //função que ao buscar os usuarios verefefica se foi passada alguma informação da tela anterior na userID, se foi ele busca as informações do usuario
    useEffect(() => {
        if (userID !== null && estabelecimentosLoaded) {
            console.log("Entrou no getinfo");
            getInfo();
        }
    }, [userID, estabelecimentosLoaded]);
    //useEffect para buscar os arquivos com o nome do usuario
    async function getInfo() {
        const user = estabelecimentos.find(user => user.id === userID);
        console.log("entrou na vereficação");
        if (user){
            setNome(user.NOME);
            setNomeF(user.NOME_FANTASIA);
            setEndereco(user.ENDERECO);
            seteNum(user.NUMERO);
            setCidade(user.CIDADE);
            setCEP(user.CEP);
            setUF(user.UF);
        }
    }
    function preencherCampos()
    {
        if(nome === ("") && nomeF === ("") && Endereco === ("") && eNum === ("") && Cidade === ("") && CEP === ("") && UF === (""))
        {
            alert("Preencha todos os campos");
        }else{
            handleEstabelecimentoButtonClick();
        }
    }
    function handleEstabelecimentoButtonClick()
    {
        if(userID === null || userID === "" || typeof userID === "undefined" || (typeof userID === "object" && Object.keys(userID).length === 0)) {
            addEstabelecimento();
        }else{
            saveEstabelecimento();
            alert(userID);
        }
    }
    //funções para incluir ou atualizar usuarios
    async function addEstabelecimento()
    {
        try{
            setLoading(true);
            const data = await addDoc(collection(db,"Estabelecimentos"), dateEstabelecimento);
            alert("Estabelecimento Adicionado com Sucesso");
            handleReload();
        }catch(error){
            alert("Ocorreu um Erro ao adicionar o Estabelecimento"+ error);
        }finally{
            setLoading(false);
        }
    }

    async function saveEstabelecimento()
    {
        try{
            setLoading(true);
            const data = await setDoc(doc(db,"Estabelecimentos",userID), dateEstabelecimento);
            alert("Estabelecimento Adicionado com Sucesso");
            handleReload();
        }catch(error){
            alert("Ocorreu um erro ao atualizar o estabelecimento "+error);
        }finally{
            setLoading(false);
        }
    }
    return(
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
                        <label className="label">Informações</label><br/>
                        <input type="text" class="modal-input" placeholder="Nome do Estabelecimento" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <input type="text" class="modal-input" placeholder="Nome Fantasia" value={nomeF} onChange={(e) => setNomeF(e.target.value)} />
                        <br/><label className="label">Logradouro</label><br/>
                        <input type="text" className="modal-input" placeholder="Endereço" value={Endereco} onChange={(e) => setEndereco(e.target.value)} disabled='true' />
                        <input type="text" className="modal-input" placeholder="Numero" value={eNum} onChange={(e) => seteNum(e.target.value)} />
                        <input type="text" className="modal-input" placeholder="Cidade" value={Cidade} onChange={(e) => setCidade(e.target.value)} disabled="true" />
                        <input type='text' className="modal-input" placeholder='CEP' value={CEP} onChange={(e) => setCEP(e.target.value)}></input>
                        <input type='text' className="modal-input" placeholder='UF' value={UF} onChange={(e) => setUF(e.target.value)} disabled="true"></input>
                        <button className="button-pequeno" onClick={handleCepSubmit}>Rastrear</button>
                    </div>
            </div>
        </div>
    </div>
    );
}

export default CreateEstabelecimento;