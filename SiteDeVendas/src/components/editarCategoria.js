import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // pegar o id do prodto da URL
import Menu from "./menu";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CssBaseline,
} from "@mui/material";

const EditarCategoria = () => {
  const { idCategoria } = useParams(); // id  da URL
  const navigate = useNavigate(); // redirecionar após a edição

  var [categoria, setCategoria] = useState('');


  //manda para o banco atualizado
  const editarCategoria = async () => {
    var url = `https://backend-completo.vercel.app/app/categorias`;
    var dados = {
      id: idCategoria,
      nome_categoria: categoria,
    };
    var token = localStorage.getItem("ALUNO_ITE");

    await axios.put(url, dados, { headers: { Authorization: `Bearer ${token}` } }).then((retorno) => {
      if (retorno.data.error) {
        alert(retorno.data.error + " Erro ao editar produto");
        console.log(retorno);
        return;
      }
      if (retorno.status === 200) {
        alert("Categoria editada com sucesso");
        navigate("/listarCategoria"); // volta para lista de produtos
      }
    })
  }
  useEffect(() => {
    listarCategorias();
  }, []);


//puxa todas as categorias do banco
  const listarCategorias = async () => {
    var url = "https://backend-completo.vercel.app/app/categorias";
    var token = localStorage.getItem("ALUNO_ITE");

    await axios.get(
        url, 
        { headers: { Authorization: `Bearer ${token}` } }
    ).then((retorno) => {
      console.log(retorno);
      if (retorno.data.error) {
        alert(retorno.data.error + " Erro ao mostrar");
        console.log(retorno);
        return;
      }


      //compara o ID da categoria selecionada e descarta o resto
      if (retorno.status === 200) {
        //categoria recebe o array da categoria clicada [id, nome]
        const categoriaSelecionada = 
        // find = testa um por um e compara com o ID 
        retorno.data.find(cat => cat._id === idCategoria)
        //se ele achar o ID, ele seta o nome da categoria na variavel
            setCategoria(categoriaSelecionada.nome)
        }
    })
  }

return (
  <CssBaseline>
      <Menu /> {/* Toolbar ADMIN visível em todas as páginas */}
    <Box sx={{ padding: 3 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          margin: "0 auto",
          bgcolor: '#333',
          color: '#fff',
          borderRadius: 2,
          maxWidth: 400,
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
          Editar Categoria
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nome da Categoria"
            variant="outlined"
            fullWidth
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            sx={{
              backgroundColor: "#555",
              "& .MuiInputLabel-root": {
                color: "#fff"
              },
              "& .MuiInputBase-input": {
                color: "#fff"
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#777"
                },
                "&:hover fieldset": {
                  borderColor: "#fff"
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#fff"
                }
              }
            }}
          />
          <Button
            variant="contained"
            onClick={editarCategoria}
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#115293",
              }
            }}
          >
            Salvar Alterações
          </Button>
        </Box>
      </Paper>
    </Box>
  </CssBaseline>

  );
};

export default EditarCategoria;
