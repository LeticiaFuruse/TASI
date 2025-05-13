import React, { useState, useEffect } from "react";
import axios from "axios";

const ListarCategorias = () => {
    var [categorias, setCategorias] = useState([])

    useEffect(() => {
        listarCategorias()
    }, [])

    const listarCategorias = async () => {
        var url = "https://backend-completo.vercel.app/app/categorias"
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
                setCategorias(retorno.data)
                console.log(retorno)
            }
        })
    }

    return (
        <div>
            <h1>Categorias</h1>

            <table border="1">
                <thead>
                    <tr>
                        <th>Usuário</th>
                        <th>Nome da categoria</th>
                    </tr>
                </thead>
                <tbody>

                    {/*  percorre array de produtos e cria uma linha para cada produto */}
                    {categorias.map((categoria, indice) => (
                        <tr value={indice}>
                            <td>{categoria.usuario}</td>
                            <td>{categoria.nome}</td>
                            {/* <td><Link to="/editarProduto">Editar</Link></td>
                                <td><Link to="/excluirProduto">Excluir</Link></td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default ListarCategorias