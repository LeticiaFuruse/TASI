import React, { useState } from "react";
import axios from "axios";
import Menu from "./menu";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CssBaseline,
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

  <CssBaseline>
    <Menu /> {/* Toolbar ADMIN visível em todas as páginas */}
  <Box sx={{ padding: 3 }}>
    <Paper
      elevation={3}
      sx={{
        p: 3,
        margin: "0 auto",
        bgcolor: "#333",
        color: "#fff",
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
        Registre-se
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Usuário"
          variant="outlined"
          fullWidth
          onChange={(e) => setCriarUsuario(e.target.value)}
          InputProps={{
            sx: {
              color: "#fff", // Cor do texto digitado
            },
          }}
          sx={{
            backgroundColor: "#555",
            "& .MuiInputLabel-root": { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#777" },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
          }}
        />

        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          onChange={(e) => setSenha(e.target.value)}
          InputProps={{
            sx: {
              color: "#fff",
            },
          }}
          sx={{
            backgroundColor: "#555",
            "& .MuiInputLabel-root": { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#777" },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
          }}
        />

        <TextField
          label="Confirmar Senha"
          type="password"
          variant="outlined"
          fullWidth
          onChange={(e) => setConfirmarSenha(e.target.value)}
          InputProps={{
            sx: {
              color: "#fff",
            },
          }}
          sx={{
            backgroundColor: "#555",
            "& .MuiInputLabel-root": { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#777" },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
          }}
        />

        <Button
          variant="contained"
          onClick={registroUsuario}
          fullWidth
          sx={{
            backgroundColor: "#1976d2", // azul padrão do Material UI
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
            py: 1.5 // Aumentando o padding vertical do botão
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

export default Registro 