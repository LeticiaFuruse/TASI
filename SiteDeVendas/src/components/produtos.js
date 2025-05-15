import React, { useState, useEffect } from "react";
import axios from "axios";

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
    var url = "https://backend-completo.vercel.app/app/produtos/";
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
  <Box sx={{ padding: 3 }}>
    <Paper
      elevation={3}
      sx={{
        p: 3,
        margin: "0 auto",
        bgcolor: '#333',
        color: '#fff',
        borderRadius: 2,
        maxWidth: 600, // Tamanho ajustado conforme a largura da tela Categoria
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
        Registrar Produto
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {[ 
          { label: "Nome do produto", onChange: setNomeProduto },
          { label: "Quantidade", type: "number", onChange: setQuantidadeProduto },
          { label: "Preço do produto", type: "number", onChange: setPrecoProduto },
          { label: "Descrição", onChange: setDescricao },
          { label: "URL da imagem", onChange: setImagem }
        ].map((field, index) => (
          <TextField
            key={index}
            label={field.label}
            type={field.type || "text"}
            variant="outlined"
            fullWidth
            onChange={(e) => field.onChange(e.target.value)}
            InputProps={{
              sx: {
                color: '#fff', // Texto digitado branco
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
          {categorias.map((cat, i) => (
            <FormControlLabel
              key={i}
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
          width: "100%", // Ocupa toda a largura disponível
          backgroundColor: '#1976d2', // Azul padrão
          color: '#fff',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        }}
        onClick={registroNovoProduto}
      >
        Registrar
      </Button>
    </Paper>
  </Box>
);



};

export default Produtos;
