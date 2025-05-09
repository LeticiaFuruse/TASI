import React, {useState} from "react";
import axios from "axios";

const Categorias =() => {
    var [nome, setNomeCategoria] = useState('')

    // conexão com o banco para a função para criar um novo produto
    const criarCategoria = async () => {
        var url = "https://backend-completo.vercel.app/app/categorias"
        var dados = {
            // nome do banco: nome da variavel
            nome_categoria: nome
            
        }

        var token = localStorage.getItem("ALUNO_ITE")

        await axios.post(
            url,
            dados,
            {headers: { Authorization: `Bearer ${token}` }}
        ).then(retorno =>{
            
            if (retorno.data.error){
                alert(retorno.data.error + " Erro ao registrar")
                console.log(retorno)
                return
            }
            if(retorno.data._id){
                alert("Registrado com sucesso")
                console.log(retorno)
            }
        })
    }



    return(
        <div>
            <h1>Categoria</h1>
            <input type="text" placeholder="Nome do categoria" onChange={(e) => setNomeCategoria(e.target.value)}/>
            <input type="button" value="Registrar" onClick={() => criarCategoria()}/>
        </div>
    )
}

export default Categorias