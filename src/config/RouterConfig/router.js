import { Route, Routes, BrowserRouter, useLocation} from "react-router-dom";
import Header from "../../components/Header/Header";
import ButtonsNav from "../../components/ButtonsNav/ButtonsNav";
import Home from "../../pages/Home";
import FuncList from '../../pages/FuncList';
import UserList from "../../pages/UserList";
import EstabList from "../../pages/EstabList";
import GerirEstab from "../../pages/GerirEstab";
import Login from "../../pages/Login";

function AppRoutes() {
  // Obter a localização atual
  const location = useLocation();

  // Verificar se a localização atual corresponde à rota de login
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Header />}
      {!isLoginPage && <ButtonsNav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lista-funcionarios" element={<FuncList />} />
        <Route path="/lista-usuarios" element={<UserList />} />
        <Route path="/lista-estabelecimento" element={<EstabList />} />
        <Route path="/gerir-estabelecimento" element={<GerirEstab />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

function RoutesApp() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default RoutesApp;
