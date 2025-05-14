import React, { useState } from "react";
import axios from "axios";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

const Registro = () => {
  var [criarUsuario, setCriarUsuario] = useState('')
  var [senha, setSenha] = useState('')
  var [confirmarSenha, setConfirmarSenha] = useState('')

  const registroUsuario = async () => {
    var url = "https://backend-completo.vercel.app/app/registrar"
    var dados = {
      usuario: criarUsuario,
      senha,
      confirma: confirmarSenha
    }

    await axios.post(
      url,
      dados
    ).then(retorno => {
      console.log(retorno)
      if (retorno.data.erro) {
        alert(retorno.data.erro + " Erro ao registrar")
        return
      }
      if (retorno.data._id) {
        alert("Registrado com sucesso")
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
          Registre-se
        </Typography>

        <TextField
          fullWidth
          label="Usuário"
          variant="outlined"
          margin="normal"
          onChange={(e) => setCriarUsuario(e.target.value)}
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

        <TextField
          fullWidth
          label="Confirmar Senha"
          type="password"
          variant="outlined"
          margin="normal"
          onChange={(e) => setConfirmarSenha(e.target.value)}
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
          onClick={registroUsuario}
        >
          Registrar
        </Button>
      </Paper>
    </Box>
  )
}

export default Registro 