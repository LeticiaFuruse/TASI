import React, { useState, useEffect } from "react";
import axios from "axios";
import EditarProduto from "./editarProduto";

const ListarVendas = () => {
    var [vendas, setVendas] = useState([])

    useEffect(() => {
        listarVendas()
    }, [])

    const listarVendas = async () => {
        var url = "https://backend-completo.vercel.app/app/venda"
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
                setVendas(retorno.data)
                console.log(retorno)
            }
        })
    }

    return (
        <div>
            <h1>Vendas</h1>

            <table border="1">
                <thead>
                    <tr>
                        <th>Usuário</th>
                        <th>Nome do cliente</th>
                        <th>Data</th>
                        <th>Produtos</th>
                    </tr>
                </thead>
                <tbody>

                    {/*  percorre array de produtos e cria uma linha para cada produto */}
                    {vendas.map((venda, indice) => (
                        <tr value={indice}>
                            <td>{venda.usuario}</td>
                            <td>{venda.nomeCliente}</td>
                            <td>{venda.data}</td>



                            <td>{produtos.map((produto, indice_prod) => (
                                <div key={indice_prod}>
                                    <label>{produto.nome}</label>
                                    <label>{produto.quantidade}</label>
                                    <label>{produto.preco}</label>
                                </div>
                            ))}</td>


                            

                            {/* <td><Link to="/editarProduto">Editar</Link></td>
                                <td><Link to="/excluirProduto">Excluir</Link></td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default ListarVendas