//App.js
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate, //rota privada
  Outlet, //rota privada
} from "react-router-dom";

import Dashboard from "./component/Dashboard";
import Produtos from "./component/Produtos";
import Pessoas from "./component/Pessoas";
import Login from "./component/Login";


const Middleware = () => {
    var logado = localStorage.getItem("ALUNO_ITE") 

    // IF logado = podem carregar as rotas que estao no middleware
    if (logado)
        return <Outlet />
    else
        return <Navigate to="/login" />
}
const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/pessoas">Pessoas</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* 
        Middleware 
        */}
        <Route element={ <Middleware />} >
          <Route path="/" element={<Dashboard />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/pessoas" element={<Pessoas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
