import { useState } from "react";
import "../../App.css";
import ReactModal from "react-modal";
import FuncPayment from "./FuncPayment";

function FuncPaymentStart({estabID})
{
    const[mes,setMes] = useState("");
    const[ano,setAno] = useState("");

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
    return(
        <div className="content-box">
            <div className='table-container'>
            <select  className='modal-input' onChange={(e) => setMes(e.target.value)} value={mes}>
                    <option>Janeiro</option>
                    <option>Fevereiro</option>
                    <option>Marco</option>
                    <option>Abril</option>
                    <option>Maio</option>
                    <option>Junho</option>
                    <option>Julho</option>
                    <option>Agosto</option>
                    <option>Setembro</option>
                    <option>Outubro</option>
                    <option>Setembro</option>
                    <option>Dezembro</option>
                </select>
                <select  className='modal-input' onChange={(e) => setAno(e.target.value)} value={ano}>
                    <option>2023</option>
                    <option>2024</option>
                    <option>2025</option>
                </select>
                <button onClick={handleOpenModal}>Avança</button>
                <ReactModal isOpen={ModalIsOpen} onRequestClose={handleCloseModal} className="custom-modal" style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } }}>
                        <FuncPayment estabID={estabID} mesSelecionado={mes} anoSelecionado={ano}/>
                        </ReactModal>
            </div>
        </div>
    )
}

export default FuncPaymentStart