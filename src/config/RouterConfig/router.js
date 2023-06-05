import { Route, Routes, BrowserRouter, useLocation, Navigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { UserContext, UserProvider } from "../ContextAPI/ContextAPI";
import Header from "../../components/Header/Header";
import ButtonsNav from "../../components/ButtonsNav/ButtonsNav";
import Home from "../../pages/Home";
import FuncList from '../../pages/FuncList';
import UserList from "../../pages/UserList";
import EstabList from "../../pages/EstabList";
import GerirEstab from "../../pages/GerirEstab";
import Login from "../../pages/Login";

function AppRoutes() {
  const { userID } = useContext(UserContext);
  const [isEmptyUserId, setIsEmptyUserId] = useState(false);

  // Verificar se o userID é nulo e atualizar isEmptyUserId
  useEffect(() => {
    if (userID === null) {
      setIsEmptyUserId(true);
    }else
    {
      setIsEmptyUserId(false);
    }
  }, [userID]);

  // Obter a localização atual
  const location = useLocation();

  // Verificar se a localização atual corresponde à rota de login
  const isLoginPage = location.pathname === '/login';

  if (isEmptyUserId && !isLoginPage) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {!isLoginPage && <Header />}
      {!isLoginPage && <ButtonsNav />}
      <Routes>
        <Route path="/home" element={<Home />} />
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
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </BrowserRouter>
  );
}

export default RoutesApp;
