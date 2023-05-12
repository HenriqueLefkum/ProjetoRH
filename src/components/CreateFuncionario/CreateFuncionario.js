import './CreateFuncionarioStyle.css'
import { db } from '../../config/firebaseConfig/firebaseConfig';
import { collection,getDocs, addDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
function CreateFuncionario()
{
    const[nome,setNome] = useState("");
    const[CPF, setCPF] = useState("");
    const[Endereco,setEndereco] = useState("");
    const[eNum, seteNum] = useState("");
    const[Cidade,setCidade] = useState("");
    const[DataNas, setDataNas] = useState("");
    const[eCivil,seteCivil] = useState("");
    const[DataCad,setDataCad] = useState("");
    const[Raca,setRaca] = useState("");
    const[PIS,setPis] = useState("");
    const[Escolaridade,setEscolaridade] = useState("");
    const[nEscola, setnEscola] = useState("");
    const[dataEscola,setdataEscola] = useState("")
    const[CTPS,setCTPS] = useState("");
    const[CTPSSerie,setCTPSSeria] = useState("");
    const[CTPSUF,setCTPSUF] = useState("");
    const[CTPSdata,setCTPSdata] = useState("");
    const[CMilitar,setCMilitar] = useState("");
    const[CMilitarSerie,setCMilitarSerie] = useState("");
    const[CMilitarCategoria] = useState("");
    const[nPai,setnPai] = useState("");
    const[Naturalidade,setNaturalidade] = useState("");
    const[NatuUF,setNatuUF] = useState("");
    const[Nacionalidade,setNacionalidade] = useState("");
    const[SalarioHora,setSalarioHroa] = useState("");
    const[Funcao,setFuncao] = useState("");
    const[dataAdm,setdataAdm] = useState("");
    const[horasSEM,sethorasSEM] = useState("");
    const[horasAlmoco,sethorasAlmoco] = useState("");
    const[TEleitor,setTEleitor] = useState("");
    const[TEZona,setTEZona] = useState("");
    const[TESecao,setTESecao] = useState("");
    const[TEleitorData,setTEleitorData] = useState("");
    const[nConjugue,setnConjugue] = useState("");
    const[nDependentes,setnDependentes] = useState("");
    const[nFilhos,setnFilhos] = useState("");

    const userCollectionRef = collection(db,"funcionarios");

    return(
        <div class="modal">
        <h1 class="modal-title">tomara que funcione</h1>
        <div class="modal-content">
          <label class="modal-label">Informações Básicas</label>
          <div class="modal-input-container">
            <input type="text" class="modal-input" placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
            <input type="text" class="modal-input" placeholder="CPF" onChange={(e) => setCPF(e.target.value)} />
          </div>
        </div>
      </div>

    );
}

export default CreateFuncionario;