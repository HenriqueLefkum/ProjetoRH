import { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig/firebaseConfig";
import { getDocs, doc, collection } from "firebase/firestore";
import "../../App.css"
import FuncPaymentStart from "../../components/FuncPayment/FuncPaymentStart"
import ReactModal from "react-modal";

function GerirEstab()
{
    
    //funções e constantes que são necessarias para puxar o bando de dados
    const[estabelecimentos,setEstabelecimentos] = useState([]);

    useEffect(() => {
        const getEstabelecimentos = async () => {
        const data = await getDocs(collection(db,"Estabelecimentos"));

        setEstabelecimentos(data.docs.map((doc) => ({...doc.data(), id : doc.id})));
      };
        getEstabelecimentos();
      }, []);

      //funções e constantes para lidar com o modal.
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
        <div className="content-box">
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
                    <th>UF</th>
                </tr>
            </thead>
            <tbody>
                {estabelecimentos.map((user) => (
                <tr key={user}>
                    <td>
                        <button class="edit-button" onClick={() => handleUserButtonClick(user.NOME)}>Pagamento</button>
                        
                    </td>
                    <td>{user.NOME}</td>
                    <td>{user.NOME_FANTASIA}</td>
                    <td>{user.ENDERECO}</td>
                    <td>{user.NUMERO}</td>
                    <td>{user.CIDADE}</td>
                    <td>{user.UF}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
                        <ReactModal isOpen={ModalIsOpen} onRequestClose={handleCloseModal} className="custom-modal" style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } }}>
                        <FuncPaymentStart estabID={selectedID} handleCloseModal={handleCloseModal}/>
                        </ReactModal>
        </div>
    );
}

export default GerirEstab;