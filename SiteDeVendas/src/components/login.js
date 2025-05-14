import React, {useState} from "react";
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
        ).then(retorno =>{
            console.log( retorno )
            if (retorno.data.erro){
                alert(retorno.data.erro)
                return
            }
            if(retorno.data.token){
                alert("Logado com sucesso")
                localStorage.setItem("ALUNO_ITE", retorno.data.token)
            }
        })
    }

    return(
        <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ p: 4, width: 350, borderRadius: 3 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Faça seu login
        </Typography>

        <TextField
          fullWidth
          label="Usuário"
          variant="outlined"
          margin="normal"
          onChange={(e) => setUsuario(e.target.value)}
        />

        <TextField
          fullWidth
          label="Senha"
          type="password"
          variant="outlined"
          margin="normal"
          onChange={(e) => setSenha(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.5 }}
          onClick={validaUsuario}
        >
          Logar
        </Button>
      </Paper>
    </Box>
    )

}

export default Login