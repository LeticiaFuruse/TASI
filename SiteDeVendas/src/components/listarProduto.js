import React, { useState } from "react";
import axios from "axios";

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
        {headers: { Authorization: `Bearer ${token}` }}
    ).then(retorno =>{
        console.log( retorno )
        if (retorno.data.error){
            alert(retorno.data.error + " Erro ao mostrar")
            console.log(retorno)
            return
        }
        if(retorno.status === 200){
            alert("Mostrado com sucesso")
            setProdutos(retorno.data)
            console.log(retorno)
        }
    })
}


  return (
    <div>
        
      <h1>Produtos</h1>
      <input type="button" value="Listar todos" onClick={() => listarProduto()}/>

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
          </tr>
        </thead>
        <tbody>
          {/*  percorre array de produtos e cria uma linha para cada produto */}
          {produtos.map((produto, index) => (
            <tr key={index}>
              <td>{produto.usuario}</td>
              <td>{produto.nome}</td>
              <td>{produto.quantidade}</td>
              <td>{produto.preco}</td>
              <td>{produto.categoria}</td>
              <td>{produto.descricao}</td>
              <td>
                {produto.imagem}
                {/* Mostra a imagem do produto se tiver URL válida */}
                {/* <img src={produto.Imagem} alt="Imagem do produto" width={80} /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarProduto;
