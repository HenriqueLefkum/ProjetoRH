import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import ButtonsNav from "../../components/ButtonsNav/ButtonsNav";
//Importação das Paginas Do App
import Home from "../../pages/Home";
import FuncList from '../../pages/pagesFuncionario/FuncList';
    function RoutesApp()
{
    /*aqui vai as funções para mudar as paginas e adivionar os componentes
    para adicionar uma pagina aperna coloque <Route path to='link que sera a URL' component='O componente da pagina'/>
    O componente Header e Buttons se inicializado antes de todo o return da pagina assim ficara como padrão
    Caso tu queira Redirecionar qualquer lugar pra qualquer lugar 
    Importe Link do react-router-dom e coloque <Link/ to='Nome da Pagina que está aqui'
    olhe a pagina ButtonsNav la tem exemplos>
    */

    
    return(
        <BrowserRouter>
            <Header/>
            <ButtonsNav/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/lista-funcionarios" element={<FuncList/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;