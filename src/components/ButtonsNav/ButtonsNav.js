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
            <Link to="lista-funcionarios">Usuarios</Link>
            <Link to="lista-funcionarios">Estabelecimento</Link>
            </div>
        </div>
        <div class="dropdown">
            <button class="dropdown-btn">Estabelecimento</button>
            <div class="dropdown-content">
            <a >Cadastrar</a>
            <a >Gerenciar</a>
            <a ></a>
            </div>
        </div>
        <div class="dropdown">
            <button class="dropdown-btn">Menu 3</button>
            <div class="dropdown-content">
            <a >Opção 3.1</a>
            <a >Opção 3.2</a>
            <a >Opção 3.3</a>
            </div>
        </div>
    </div>

    );

}

export default ButtonsNav;