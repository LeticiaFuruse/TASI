import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Form } from "react-router-dom"; // pegar o id do prodto da URL
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

const EditarProduto = () => {
  const { idProduto } = useParams(); // id  da URL
  const navigate = useNavigate(); // redirecionar após a edição

  var [nome, setNome] = useState("");
  var [quantidade, setQuantidade] = useState("");
  var [categoria, setCategoria] = useState("");
  var [preco, setPreco] = useState("");
  var [descricao, setDescricao] = useState("");
  var [imagem, setImagem] = useState("");

  //so usa no Radio button
  const [categorias, setCategorias] = useState([]);

  //chama a função quando for carregada
  useEffect(() => {
    carregarProduto();
    carregarCategorias();
  }, []);

  const carregarProduto = async () => {
    var url = `https://backend-completo.vercel.app/app/produtos`;
    var token = localStorage.getItem("ALUNO_ITE");

    //teste
    console.log("Token:", token);
    console.log("URL da requisição:", url);

    await axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((retorno) => {
        if (retorno.data.error) {
          alert(retorno.data.error + " Erro ao carregar produto");
          console.log(retorno);
          return;
        }
        if (retorno.status === 200) {
          const produtoSelecionado =
            // find = testa um por um e compara com o ID
            retorno.data.find((prod) => prod._id === idProduto);
          //se ele achar o ID, ele seta o nome da categoria na variavel

          setNome(produtoSelecionado.nome);
          setQuantidade(produtoSelecionado.quantidade);
          setPreco(produtoSelecionado.preco);
          setCategoria(produtoSelecionado.categoria);
          setDescricao(produtoSelecionado.descricao);
          setImagem(produtoSelecionado.imagem);

          console.log(produtoSelecionado);
        }
      });
  };

  const editarProduto = async () => {
    var url = `https://backend-completo.vercel.app/app/produtos`;
    var dados = {
      nome,
      quantidade,
      preco,
      descricao,
      imagem,
    };
    var token = localStorage.getItem("ALUNO_ITE");

    await axios.put(url, dados, { headers: { Authorization: `Bearer ${token}` } }).then((retorno) => {
      if (retorno.data.error) {
        alert(retorno.data.error + " Erro ao editar produto");
        console.log(retorno);
        return;
      }
      if (retorno.status === 200) {
        alert("Produto editado com sucesso");
        navigate("/produtos"); // volta para lista de produtos
      }
    });
  };

  const carregarCategorias = async () => {
    var url = "https://backend-completo.vercel.app/app/categorias";
    var token = localStorage.getItem("ALUNO_ITE");

    await axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then((retorno) => {
      console.log(retorno);
      if (retorno.data.error) {
        alert(retorno.data.error + " Erro ao mostrar");
        console.log(retorno);
        return;
      }
      if (retorno.status === 200) {
        setCategorias(retorno.data);
        console.log(retorno);
      }
    });
  };

  return (
    <div>
      <h1>Editar Produto</h1>
      <div>
        <label>Nome do Produto</label>
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

      <RadioGroup value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        {categorias.map((cat) => (
          <FormControlLabel key={cat._id} value={cat.nome} control={<Radio />} label={cat.nome} />
        ))}
      </RadioGroup>

      <div>
        <label>Descrição</label>
        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      </div>
      <div>
        <label>URL da imagem</label>
        <textarea value={imagem} onChange={(e) => setImagem(e.target.value)} />
      </div>
      <div>
        <button onClick={editarProduto}>Salvar Alterações</button>
      </div>
    </div>
  );
};

export default EditarProduto;
