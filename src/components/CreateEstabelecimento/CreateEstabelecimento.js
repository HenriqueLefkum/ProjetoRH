import { collection, doc, setDoc, addDoc, getDocs, getDoc } from "firebase/firestore";
import { db , storage} from "../../config/firebaseConfig/firebaseConfig";
import React, {useState, useEffect} from "react";
import "../../App.css"
import { ref , getDownloadURL, uploadBytes} from "firebase/storage"

function CreateEstabelecimento({userID})
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
    const[arquivos,setArquivos] = useState([]);
    const[arquivo,setArquivo] = useState(null);
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

    if(loading)
    {
        <h1>Carregando</h1>
    }
    function handleReload()
    {
        window.location.reload();
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
    function getInfo() {
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

    async function handleUpload()
    {
        if(arquivo)
        {
            
            try{
                setLoading(true);
                const fileUrl = await uploadBytes(ref(storage,'/Estabelecimento/' + userID + '/' + arquivo.name),arquivo);
                alert("Arquivo Enviado com Sucesso");
                handleReload();
            }catch(error){
                alert("Ouve um erro ao enviar o arquivo" + error);
            }finally{
                setLoading(false);
            }
        }
    }

    const handleFileUpload = (event) => 
    {
        const file = event.target.files[0];
        setArquivo(file);
    }

    //funções para gerir a tela
    const[telaAtiva, setTelaAtiva] = useState("informacoes");

    const handleMostrarInformaçoes = () => {
        setTelaAtiva('informaçoes');
    }
    const handleMostrarArquivos = () => {
        setTelaAtiva('arquivos'); 
    }
    return(
        <div class="modal">
            <div class="header">
                <div class="header-buttons">
                    <button onClick={handleMostrarInformaçoes} className={telaAtiva === 'informaçoes' ? 'botao-selecionado': ''}>Ficha</button>
                    <button onClick={handleMostrarArquivos} className={telaAtiva === 'arquivos' ? 'botao-selecionado' : ''}>Arquivos</button>
                    <button class="save-button" onClick={handleEstabelecimentoButtonClick}>Salvar</button>
                    <button class="exit-button"onClick={handleReload}>Sair</button>
                </div>
            </div>

            <div>
                {telaAtiva === 'informações' && (
                <div>
                    <div className='info-label'>
                        <label className="label">Informações</label><br/>
                        <input type="text" class="modal-input" placeholder="Nome do Estabelecimento" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <input type="text" class="modal-input" placeholder="Nome Fantasia" value={nomeF} onChange={(e) => setNomeF(e.target.value)} />
                        <br/><label className="label">Logradouro</label><br/>
                        <input type="text" className="modal-input" placeholder="Endereço" value={Endereco} onChange={(e) => setEndereco(e.target.value)} />
                        <input type="text" className="modal-input" placeholder="Numero" value={eNum} onChange={(e) => seteNum(e.target.value)} />
                        <input type="text" className="modal-input" placeholder="Cidade" value={Cidade} onChange={(e) => setCidade(e.target.value)} />
                        <input type='text' className="modal-input" placeholder='CEP' value={CEP} onChange={(e) => setCEP(e.target.value)}></input>
                        <input type='text' className="modal-input" placeholder='UF' value={UF} onChange={(e) => setUF(e.target.value)}></input>
                    </div>
            </div>
            )}
            {telaAtiva === 'arquivos' && (
                <div>
                    <h1>teste</h1>
                    <input type="file" onChange={handleFileUpload}></input>
                    <button onClick={handleUpload}></button>
                </div>
            )}
        </div>
    </div>
    );
}

export default CreateEstabelecimento;