import React, {useState} from "react";
import axios from "axios";

const Produtos = () => {
    var [nome, setNomeProduto] = useState('')
    var [quantidade, setQuantidadeProduto] = useState('')
    var [preco, setPrecoProduto] = useState('')
    var [categoria, setCategoria] = useState('')
    var [descricao, setDescricao] = useState('')
    var [imagem, setImagem] = useState('')
    
    // conexão com o banco para a função para criar um novo produto
    const registroNovoProduto = async () => {
        var url = "https://backend-completo.vercel.app/app/produtos"
        var dados = {
            nome: nome,
            quantidade: quantidade,
            preco: preco,
            categoria: categoria,
            descricao: descricao,
            imagem: imagem

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

            <h1>Registrar Produtos</h1>

            <input type="text" placeholder="Nome do produto" onChange={(e) => setNomeProduto(e.target.value)}/>
            <input type="number" placeholder="Quantidade" onChange={(e) => setQuantidadeProduto(e.target.value)}/>
            <input type="number" placeholder="Preço do produto" onChange={(e) => setPrecoProduto(e.target.value)}/>

            {/* MUDAR TIPOS DE INPUT PARA SELECIONAR A CATEGORIA */}
            <input type="text" placeholder="Categoria do produto" onChange={(e) => setCategoria(e.target.value)}/>

            <input type="text" placeholder="Descrição do produto" onChange={(e) => setDescricao(e.target.value)}/>
            <input type="text" placeholder="URL da imagem do produto" onChange={(e) => setImagem(e.target.value)}/>


            <input type="button" value="Registrar" onClick={() => registroNovoProduto()}/>
        </div>

    )
}

export default Produtos