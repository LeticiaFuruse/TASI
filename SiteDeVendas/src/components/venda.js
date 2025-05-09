import React, { useState, useEffect } from "react";
import axios from "axios";

const Venda = () => {
    var [nomeCliente, setNomeCliente] = useState('')
    var [data, setData] = useState('')
    var [produtos, setProdutos] = useState([])
    const [produtosVendidos, setProdutosVendidos] = useState([])


    const criarVenda = async () => {
        var url = "https://backend-completo.vercel.app/app/venda"
        var dados = {
            nomeCliente: nomeCliente,
            data: data,
            produtos: produtosVendidos 
        }
        var token = localStorage.getItem("ALUNO_ITE")
        await axios.post(
            url,
            dados,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            if (retorno.data.error) {
                alert(retorno.data.error + " Erro ao registrar")
                console.log(retorno)
                return
            }
            if (retorno.data._id) {
                alert("Registrado com sucesso")
                console.log(retorno)
            }
        })
    }
// executa a função na hora que a pagina é aberta
    useEffect(() => {
        listarProduto();
    }, []);


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
                
                setProdutos(retorno.data)
                console.log(retorno)
            }
        })
    }
    return (
        <div>
            <h1>Vendas</h1>
            <input type="text" placeholder="Nome do cliente" onChange={(e) => setNomeCliente(e.target.value)} />
            <input type="date" onChange={(e) => setData(e.target.value)} />
            {produtos.map((produto, indice) => (
                <div key={indice}>
                    <img width={80} src={produto.imagem} alt={produto.nome} />
                    <h2>{produto.nome}</h2>
                    <h2>{produto.quantidade}</h2>
                    <h2>{produto.preço}</h2>
                    
                    <input type="checkbox" onChange={(e) => {
                        if(e.target.checked){
                            setProdutosVendidos([...produtosVendidos, produto])
                        }else{
                            setProdutosVendidos(produtosVendidos.filter(p=>p._id!==produto._id))
                        }
                            
                    }}/>
                </div>
            ))}
            <input type="button" value="Concluir venda" onClick={() => criarVenda()} />
        </div>
    )
}

export default Venda