import React, { useState } from "react";
import axios from "axios";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

const Login = () => {
  var [usuario, setUsuario] = useState('')
  var [senha, setSenha] = useState('')

  const validaUsuario = async () => {
    var url = "https://backend-completo.vercel.app/app/login"
    var dados = {
      usuario,
      senha
    }

    await axios.post(
      url,
      dados
    ).then(retorno => {
      console.log(retorno)
      if (retorno.data.erro) {
        alert(retorno.data.erro)
        return
      }
      if (retorno.data.token) {
        alert("Logado com sucesso")
        localStorage.setItem("ALUNO_ITE", retorno.data.token)
      }
    })
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: 350,
          borderRadius: 3,
          bgcolor: '#333', // Cor de fundo do Paper (preto fosco)
          color: '#fff', // Cor do texto
        }}
      >
        <Typography variant="h5" mb={3} textAlign="center" color="#fff">
          Faça seu login
        </Typography>

        <TextField
          fullWidth
          label="Usuário"
          variant="outlined"
          margin="normal"
          onChange={(e) => setUsuario(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#555', // Cor de fundo do input (cinza escuro)
            },
            '& .MuiInputLabel-root': {
              color: '#fff', // Cor do label (branco)
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#777', // Cor da borda (cinza claro)
            },
          }}
        />

        <TextField
          fullWidth
          label="Senha"
          type="password"
          variant="outlined"
          margin="normal"
          onChange={(e) => setSenha(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#555', // Cor de fundo do input (cinza escuro)
            },
            '& .MuiInputLabel-root': {
              color: '#fff', // Cor do label (branco)
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#777', // Cor da borda (cinza claro)
            },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            backgroundColor: '#444', // Cor do botão (cinza mais escuro)
            '&:hover': {
              backgroundColor: '#666', // Cor ao passar o mouse (cinza claro)
            },
          }}
          onClick={validaUsuario}
        >
          Logar
        </Button>
      </Paper>
    </Box>
  )

}

export default Login