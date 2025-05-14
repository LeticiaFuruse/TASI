import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const Produtos = () => {
  var [nome, setNomeProduto] = useState("");
  var [quantidade, setQuantidadeProduto] = useState("");
  var [preco, setPrecoProduto] = useState("");
  var [categoria, setCategoria] = useState("");
  var [categorias, setCategorias] = useState([]);

  var [descricao, setDescricao] = useState("");
  var [imagem, setImagem] = useState("");

  useEffect(() => {
    listarCategoria();
  }, []);

  const listarCategoria = async () => {
    var url = "https://backend-completo.vercel.app/app/categorias";

    var token = localStorage.getItem("ALUNO_ITE");

    await axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then((retorno) => {
      if (retorno.data.error) {
        alert(retorno.data.error);
        return;
      }
      if (retorno.status === 200) {
        setCategorias(retorno.data);

        console.log(retorno);
      }
    });
  };

  // conexão com o banco para a função para criar um novo produto
  const registroNovoProduto = async () => {
    var url = "https://backend-completo.vercel.app/app/produtos";
    var dados = {
      nome: nome,
      quantidade: quantidade,
      preco: preco,
      categoria: categoria,
      descricao: descricao,
      imagem: imagem,
    };

    var token = localStorage.getItem("ALUNO_ITE");

    await axios.post(url, dados, { headers: { Authorization: `Bearer ${token}` } }).then((retorno) => {
      if (retorno.data.error) {
        alert(retorno.data.error);
        return;
      }
      if (retorno.data._id) {
        alert("Registrado com sucesso");
        console.log(retorno);
      }
    });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 800, borderRadius: 3 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Registrar Produto
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={2}>
          <TextField
            label="Nome do produto"
            variant="outlined"
            sx={{ width: "calc(50% - 8px)" }}
            onChange={(e) => setNomeProduto(e.target.value)}
          />

          <TextField
            type="number"
            label="Quantidade"
            variant="outlined"
            sx={{ width: "calc(50% - 8px)" }}
            onChange={(e) => setQuantidadeProduto(e.target.value)}
          />

          <TextField
            type="number"
            label="Preço do produto"
            variant="outlined"
            sx={{ width: "calc(50% - 8px)" }}
            onChange={(e) => setPrecoProduto(e.target.value)}
          />

          <TextField
            label="Descrição"
            variant="outlined"
            sx={{ width: "calc(50% - 8px)" }}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <TextField
            label="URL da imagem"
            variant="outlined"
            sx={{ width: "calc(50% - 8px)" }}
            onChange={(e) => setImagem(e.target.value)}
          />
        </Box>

        <FormControl component="fieldset" sx={{ mt: 3 }}>
          <FormLabel component="legend">Categoria</FormLabel>
          <RadioGroup row value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            {categorias.map((cat, i) => (
              <FormControlLabel key={i} value={cat.nome} control={<Radio />} label={cat.nome} />
            ))}
          </RadioGroup>
        </FormControl>

        <Button variant="contained" fullWidth sx={{ mt: 3, py: 1.5 }} onClick={registroNovoProduto}>
          Registrar
        </Button>
      </Paper>
    </Box>
  );
};

export default Produtos;
