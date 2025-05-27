import React, {useState} from "react";
import axios from "axios";

import Menu from "./menu";

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
  CssBaseline,
} from "@mui/material";

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
        Categoria
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Nome da Categoria"
          variant="outlined"
          fullWidth
          onChange={(e) => setNomeCategoria(e.target.value)}
          sx={{
            backgroundColor: "#555",
            "& .MuiInputLabel-root": {
              color: "#fff"
            },
            "& .MuiInputBase-input": {
              color: "#fff" // COR DO TEXTO DIGITADO
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
          onClick={() => criarCategoria()}
          sx={{
            backgroundColor: "#1976d2", // COR DIFERENTE DO BOTÃO
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#115293",
            }
          }}
        >
          Registrar
        </Button>
      </Box>
    </Paper>
  </Box>
  </CssBaseline>
    

);

}

export default Categorias