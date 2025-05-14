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
import { CssBaseline } from '@mui/material';


//puxa os arquivos que eu crio
import Dashboard from './components/dashboard';
import Pessoas from './components/pessoas';
import Login from './components/login';
import Produtos from './components/produtos';
import Registro from './components/registro';
import ListarProduto from './components/listarProduto';
import Categorias from './components/categorias';
import ListarCategoria from './components/listarCategorias';
import Venda from './components/venda';
import ListarVendas from './components/listarVendas';
import EditarProduto from './components/editarProduto';
import EditarCategoria from './components/editarCategoria';
import LimparTabelas from './components/limparTabelas';
import Menu from './components/menu';

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
        <CssBaseline />
            <div>
                <Menu /> {/* Toolbar visível em todas as páginas */}

                <Routes>
                    {/* Rotas públicas */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />

                    {/* Rotas protegidas */}
                    <Route element={<Middleware />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/pessoas" element={<Pessoas />} />
                        <Route path="/produtos" element={<Produtos />} />
                        <Route path="/listarProduto" element={<ListarProduto />} />
                        <Route path="/categorias" element={<Categorias />} />
                        <Route path="/listarCategoria" element={<ListarCategoria />} />
                        <Route path="/venda" element={<Venda />} />
                        <Route path="/listarVendas" element={<ListarVendas />} />
                        <Route path="/editarProduto/:idProduto" element={<EditarProduto />} />
                        <Route path="/editarCategoria/:idCategoria" element={<EditarCategoria />} />
                        <Route path="/limparTabelas" element={<LimparTabelas />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
