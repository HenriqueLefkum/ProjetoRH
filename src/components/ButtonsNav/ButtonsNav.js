import React, { useState } from "react";
import './ButtonsNavStyle.css'
import { Link } from 'react-router-dom'
import ChangePassword from "../ChangePassword/ChangePassword";
import ReactModal from "react-modal";

function ButtonsNav()
{
    const [ModalIsOpen,setModalIsOpen] = useState(false);
    const handleOpenModal = () =>
      {
          setModalIsOpen(true);
      }
      const handleCloseModal = () => {
          setModalIsOpen(false);
      }
    return(
    <div class="dropdown-container">
        <div class="dropdown">
            <button class="dropdown-btn">Gerenciamento</button>
            <div class="dropdown-content">
            <Link to="lista-funcionarios">Funcionarios</Link>
            <Link to="lista-usuarios">Usuarios</Link>
            <Link to="lista-estabelecimento">Estabelecimento</Link>
            </div>
        </div>
        <div class="dropdown">
            <button class="dropdown-btn">Estabelecimento</button>
            <div class="dropdown-content">
            <Link to={"lista-estabelecimento"}>Cadastrar</Link>
            <Link to={"gerir-estabelecimento"}>Gerenciar</Link>
            </div>
        </div>
        <div class="dropdown">
            <button class="dropdown-btn">Perfil</button>
            <div class="dropdown-content">
            <button onClick={handleOpenModal}>Trocar Senha</button>
            <ReactModal isOpen={ModalIsOpen} onRequestClose={handleCloseModal}className="custom-modal" style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } }}>
            <ChangePassword/>
            </ReactModal>
            <Link to={"login"}>Sair</Link>
            </div>
        </div>
    </div>

    );

}

export default ButtonsNav;