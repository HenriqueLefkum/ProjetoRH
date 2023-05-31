import React from "react";
import './ButtonsNavStyle.css'
import { Link } from 'react-router-dom'
import GerirEstab from "../../pages/GerirEstab";

function ButtonsNav()
{
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
            <Link></Link>
            </div>
        </div>
        <div class="dropdown">
            <button class="dropdown-btn">Menu 3</button>
            <div class="dropdown-content">
            <Link>Meu Perfil</Link>
            <Link>Trocar Senhar</Link>
            <Link>Sair</Link>
            </div>
        </div>
    </div>

    );

}

export default ButtonsNav;