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
        Faça seu login
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Usuário"
          variant="outlined"
          fullWidth
          onChange={(e) => setUsuario(e.target.value)}
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

        <Button
          variant="contained"
          onClick={validaUsuario}
          sx={{
            backgroundColor: "#1976d2", // azul padrão
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          Logar
        </Button>
      </Box>
    </Paper>
  </Box>
);




}

export default Login