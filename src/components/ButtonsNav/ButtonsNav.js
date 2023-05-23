import React from "react";
import './ButtonsNavStyle.css'
import { Link } from 'react-router-dom'

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
            <Link>Cadastrar</Link>
            <Link>Gerenciar</Link>
            <Link></Link>
            </div>
        </div>
        <div class="dropdown">
            <button class="dropdown-btn">Menu 3</button>
            <div class="dropdown-content">
            <Link>Opção 3.1</Link>
            <Link>Opção 3.2</Link>
            <Link>Opção 3.3</Link>
            </div>
        </div>
    </div>

    );

}

export default ButtonsNav;