import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // pegar o id do prodto da URL

const EditarProduto = () => {
    const { id } = useParams();  // id  da URL
    const navigate = useNavigate();  // redirecionar após a edição
    var [nome, setNome] = useState('');
    var [quantidade, setQuantidade] = useState('');
    var [categoria, setCategoria] = useState('');
    var [preco, setPreco] = useState('');
    var [descricao, setDescricao] = useState('');
    var [imagem, setImagem] = useState('');

    const carregarProduto = async () => {
        var url = `https://backend-completo.vercel.app/app/produto/${id}`;
        var token = localStorage.getItem("ALUNO_ITE");

        await axios.get(
            url,
            {
                headers: { Authorization: `Bearer ${token}` }
            }).then(retorno => {
                if (retorno.data.error) {
                    alert(retorno.data.error + " Erro ao carregar produto");
                    console.log(retorno);
                    return;
                }
                if (retorno.status === 200) {
                    const produto = retorno.data;
                    setNome(produto.nome);
                    setQuantidade(produto.quantidade);
                    setPreco(produto.preco);
                    setDescricao(produto.descricao);
                }
            });
    };

    const editarProduto = async () => {
        var url = `https://backend-completo.vercel.app/app/produto/${id}`;
        var dados = {
            nome: nome,
            quantidade: quantidade,
            preco: preco,
            descricao: descricao,
        };
        var token = localStorage.getItem("ALUNO_ITE");

        await axios.put(url, dados, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(retorno => {
            if (retorno.data.error) {
                alert(retorno.data.error + " Erro ao editar produto");
                console.log(retorno);
                return;
            }
            if (retorno.status === 200) {
                alert("Produto editado com sucesso");
                navigate("/produtos");  // volta para lista de produtos 
            }
        });
    };

    return (
        <div>
            <h1>Editar Produto</h1>
                <div>
                    <h2>Nome do Produto</h2>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
            <div>
                <label>Quantidade</label>
                <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
            </div>
            <div>
                <label>Preço</label>
                <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} />
            </div>
            <div>
                <label>Categoria</label>
                <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
            </div>
            <div>
                <label>Descrição</label>
                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)}
                />
            </div>
            <div>
                <label>URL da imagem</label>
                <textarea value={imagem} onChange={(e) => setImagem(e.target.value)}
                />
            </div>
            <div>
                <button onClick={editarProduto}>Salvar Alterações</button>
            </div>

        </div>
    );
};

export default EditarProduto;
