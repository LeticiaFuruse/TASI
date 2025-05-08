import React, {useState} from "react";
import axios from "axios";

const Produtos = () =>{
    var [criarUsuario, setCriarUsuario] = useState('')
    var [criarNomeProduto, setCriarNomeProduto] = useState('')
    var [criarQuantidadeProduto, setCriarQuantidadeProduto] = useState('')
    var [criarPrecoProduto, setCriarPrecoProduto] = useState('')
    var [criarCategoria, setCategoria] = useState('')
    var [criarDescricao, setCriarDescricao] = useState('')
    var [criarImagem, setCriarImagem] = useState('')
    
    
    const registroNovoProduto = async () => {
        var url = "https://backend-completo.vercel.app/app/produtos"
        var dados = {
            nome: criarNomeProduto,
            quantidade: criarQuantidadeProduto,
            preco: criarPrecoProduto,
            categoria: criarCategoria,
            descricao: criarDescricao,
            usuario: criarUsuario,
            imagem: criarImagem

        }

        var token = localStorage.getItem("ALUNO_ITE")

        await axios.post(
            url,
            dados,
            {headers: { Authorization: `Bearer ${token}` }}
        ).then(retorno =>{
            console.log( retorno )
            if (retorno.data.error){
                alert(retorno.data.error + " Erro ao registrar")
                console.log(retorno)
                return
            }
            if(retorno.data._id){
                alert("Registrado com sucesso")
            }
        })
    }

    
    
    
    return(
        <div>

            <h1>Registrar Produtos</h1>


            <input type="text" placeholder="Usuario" onChange={(e) => setCriarUsuario(e.target.value)}/>
            <input type="text" placeholder="Nome do produto" onChange={(e) => setCriarNomeProduto(e.target.value)}/>
            <input type="number" placeholder="Quantidade" onChange={(e) => setCriarQuantidadeProduto(e.target.value)}/>
            <input type="number" placeholder="Preço do produto" onChange={(e) => setCriarPrecoProduto(e.target.value)}/>

            {/* MUDAR TIPOS DE INPUT PARA SELECIONAR A CATEGORIA */}
            <input type="text" placeholder="Categoria do produto" onChange={(e) => setCategoria(e.target.value)}/>

            <input type="text" placeholder="Descrição do produto" onChange={(e) => setCriarDescricao(e.target.value)}/>
            <input type="text" placeholder="URL da imagen do produto" onChange={(e) => setCriarImagem(e.target.value)}/>


            <input type="button" value="Registrar" onClick={() => registroNovoProduto()}/>
        </div>

    )
}

export default Produtos