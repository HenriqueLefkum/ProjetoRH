import { db } from "../../config/firebaseConfig/firebaseConfig";
import { collection, doc, deleteDoc, getDocs } from "firebase/firestore";
import ReactModal from "react-modal";
import deleteButtonImage from '../../images/button/button-delete.png';
import editButtonImage from '../../images/button/button-edit.png'
import { useEffect, useState } from "react";
import CreateEstabelecimento from "../../components/CreateEstabelecimento/CreateEstabelecimento";
import "../../App.css"

function EstabList()
{
    const[Estabelecimentos,setEstabelecimentos] = useState([]);
    const userCollectionRef = collection(db,"Estabelecimentos");

    useEffect(() => {
        //criando uma variavel asyncrona para pegar os usuarios
        const getEstabelecimentos = async () => {
        //usando getdocs para puxar o firestore
        const data = await getDocs(userCollectionRef);
        //setando os usuarios em uma array durante que o id do documento seja igual
        setEstabelecimentos(data.docs.map((doc) => ({...doc.data(), id : doc.id})));
      };
        //executa a função que chamamos
        getEstabelecimentos();
    }, []);

    async function deleteEstab(userID)
    {
        const confirmDelete = window.confirm("Tem certeza que deseja deletar esse Estabelecimentos?");
        if(confirmDelete){
        try{
            await deleteDoc(doc(db,"Estabelecimentos",userID));
            alert("Funcionario Deletado com Sucesso");
        }catch(error){
            alert("Ouve um erro ao deletar o Funcionario",error)
        }
        }
    }
    const[ModalIsOpen, setModalIsOpen] = useState(false);
    const[selectedID,setSelectedID] = useState('');
    const handleOpenModal = () =>
    {
        setModalIsOpen(true);
    }
    const handleCloseModal = () => {
        setModalIsOpen(false);
        setSelectedID('');
    }
    function handleUserButtonClick(id)
    {
        setSelectedID(id);
        setModalIsOpen(true);
        console.log(id);
    }

    return(
        <div className='content-box'>
        <div className='button-box'>
            <button onClick={handleOpenModal}>Add</button>
            <ReactModal isOpen={ModalIsOpen} onRequestClose={handleCloseModal} className="custom-modal" style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } }}>
            <CreateEstabelecimento userID={selectedID}  handleCloseModal={handleCloseModal}/>
            </ReactModal>
        </div>
    <div className='table-container'>
        <table>
        <thead>
            <tr>
                <th>AÇÃO</th>
                <th>NOME</th>
                <th>NOME_FANTASIA</th>
                <th>ENDERECO</th>
                <th>NUMERO</th>
                <th>CIDADE</th>
                <th>CEP</th>
                <th>UF</th>
            </tr>
        </thead>
        <tbody>
            {Estabelecimentos.map((user) => (
            <tr key={user}>
                <td>
                    <button class="delete-button"><img src={deleteButtonImage} alt="Deletar" onClick={() => deleteEstab(user.id)}/></button>
                    <button class="edit-button" onClick={() => handleUserButtonClick(user.id)}>  <img src={editButtonImage} alt="Editar"/></button>
                </td>
                <td>{user.NOME}</td>
                <td>{user.NOME_FANTASIA}</td>
                <td>{user.ENDERECO}</td>
                <td>{user.ENUM}</td>
                <td>{user.CIDADE}</td>
                <td>{user.CEP}</td>
                <td>{user.UF}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    </div>
    );
}

export default EstabList;