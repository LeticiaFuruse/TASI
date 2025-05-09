import React, { useState } from "react";
import axios from "axios";
import {
  Link
} from 'react-router-dom';
// componente que lista os produtos
const ListarProduto = () => {
  // começa um array vazio
  var [produtos, setProdutos] = useState([])

  // executar a função
  const listarProduto = async () => {
    var url = "https://backend-completo.vercel.app/app/produtos"
    var token = localStorage.getItem("ALUNO_ITE")

    await axios.get(
      url,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(retorno => {
      console.log(retorno)
      if (retorno.data.error) {
        alert(retorno.data.error + " Erro ao mostrar")
        console.log(retorno)
        return
      }
      if (retorno.status === 200) {
        alert("Mostrado com sucesso")
        setProdutos(retorno.data)
        console.log(retorno)
      }
    })
  }

  return (
    <div>

      <h1>Produtos</h1>
      <input type="button" value="Listar todos" onClick={() => listarProduto()} />

      <table border="1">
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Imagem</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>

          {/*  percorre array de produtos e cria uma linha para cada produto */}
          {produtos.map((prod, indice) => (
            <tr value={indice}>
              <td>{prod.usuario}</td>
              <td>{prod.nome}</td>
              <td>{prod.quantidade}</td>
              <td>{prod.preco}</td>
              <td>{prod.categoria}</td>
              <td>{prod.descricao}</td>
              <td>
                {prod.imagem}
              </td>
              <td>
                {/* pega o id do produto */}
                <Link to={`/editarProduto/${prod._id}`}>Editar</Link>
              </td>
              <td><Link to="/excluirProduto">Excluir</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarProduto;
