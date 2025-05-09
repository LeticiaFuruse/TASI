// App.js
import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
    Link
} from 'react-router-dom';
import Dashboard from './components/dashboard';
import Produtos from './components/produtos';
import Pessoas from './components/pessoas';
import Login from './components/login';
import Registro from './components/registro';
import ListarProduto from './components/listarProduto';

const Middleware = () => {
    var logado = localStorage.getItem("ALUNO_ITE");

    if (logado) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <nav className="menu" style={{ display: "flex", gap: "10px" }}>
                    <Link to="/">Principal</Link>
                    <Link to="/produtos">Produtos</Link>
                    <Link to="/pessoas">Pessoas</Link>
                    <Link to="/registro">Registro</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/listarProduto">Listar Produto</Link>
                </nav>

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />

                    <Route element={<Middleware />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/produtos" element={<Produtos />} />
                        <Route path="/pessoas" element={<Pessoas />} />
                        <Route path="/listarProduto" element={<ListarProduto />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
