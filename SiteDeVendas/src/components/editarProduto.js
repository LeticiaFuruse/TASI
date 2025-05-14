import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Form } from "react-router-dom"; // pegar o id do prodto da URL

import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from "@mui/material";


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
        navigate("/listarProduto"); // volta para lista de produtos
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
    <Box sx={{ padding: 3 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          margin: "0 auto",
          bgcolor: '#333',
          color: '#fff',
          borderRadius: 2,
          maxWidth: 600,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          Editar Produto
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[
            { label: "Nome do Produto", value: nome, onChange: setNome },
            { label: "Quantidade", value: quantidade, onChange: setQuantidade, type: "number" },
            { label: "Preço", value: preco, onChange: setPreco, type: "number" },
            { label: "Descrição", value: descricao, onChange: setDescricao, type: "textarea" },
            { label: "URL da Imagem", value: imagem, onChange: setImagem, type: "textarea" },
          ].map((field, index) => (
            <TextField
              key={index}
              label={field.label}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              type={field.type || "text"}
              variant="outlined"
              fullWidth
              InputProps={{
                sx: {
                  color: '#fff',
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#555',
                },
                '& .MuiInputLabel-root': {
                  color: '#fff',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#777',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#fff',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#fff',
                },
              }}
            />
          ))}
        </Box>

        <FormControl
          component="fieldset"
          sx={{
            mt: 4,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            textAlign: "center",
          }}
        >
          <FormLabel
            component="legend"
            sx={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: '#fff'
            }}
          >
            Categoria
          </FormLabel>
          <RadioGroup
            row
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            sx={{
              justifyContent: "center",
              width: "100%",
            }}
          >
            {categorias.map((cat) => (
              <FormControlLabel
                key={cat._id}
                value={cat.nome}
                control={<Radio sx={{ color: '#fff' }} />}
                label={cat.nome}
                sx={{ marginRight: "16px", color: '#fff' }}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          sx={{
            display: "block",
            mt: 3,
            py: 1.5,
            mx: "auto",
            width: "100%",
            backgroundColor: '#1976d2',
            color: '#fff',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
          onClick={editarProduto}
        >
          Salvar Alterações
        </Button>
      </Paper>
    </Box>
  );
};

export default EditarProduto;
