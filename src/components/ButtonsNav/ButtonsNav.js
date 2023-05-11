import React from "react";
import './ButtonsNavStyle.css'
import { Link } from 'react-router-dom'

function ButtonsNav()
{
    return(
    <div class="dropdown-container">
        <div class="dropdown">
            <button class="dropdown-btn">Funcionarios</button>
            <div class="dropdown-content">
            <Link to="lista-funcionarios">Funcionarios</Link>
            <a >Opção 1.2</a>
            <a >Opção 1.3</a>
            </div>
        </div>
        <div class="dropdown">
            <button class="dropdown-btn">Menu 2</button>
            <div class="dropdown-content">
            <a >Opção 2.1</a>
            <a >Opção 2.2</a>
            <a >Opção 2.3</a>
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