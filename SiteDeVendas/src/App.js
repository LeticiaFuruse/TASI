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

                    {/* aparecer na tela */}
                    <Link to="/">Principal</Link>
                    <Link to="/pessoas">Pessoas</Link>
                    <Link to="/registro">Registro</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/produtos">Produtos</Link>
                    <Link to="/listarProduto">Listar Produto</Link>
                    <Link to="/categorias">Categoria</Link>
                    <Link to="/listarCategoria">Listar Categoria</Link>
                    <Link to="/Venda">Venda</Link>
                    <Link to="/listarVendas">Listar vendas</Link>
                    <Link to="/limparTabelas">Limpar</Link>
                </nav>

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />

                    <Route element={<Middleware />}>
                    {/* rotas seguras = depois de logar */}
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/produtos" element={<Produtos />} />
                        <Route path="/pessoas" element={<Pessoas />} />
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
