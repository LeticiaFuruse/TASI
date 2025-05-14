import React, {useState} from "react";
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
            usuario:criarUsuario,
            senha,
            confirma: confirmarSenha
        }

        await axios.post(
            url,
            dados
        ).then(retorno =>{
            console.log( retorno )
            if (retorno.data.erro){
                alert(retorno.data.erro + " Erro ao registrar")
                return
            }
            if(retorno.data._id){
                alert("Registrado com sucesso")
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
          Registre-se
        </Typography>

        <TextField
          fullWidth
          label="Usuário"
          variant="outlined"
          margin="normal"
          onChange={(e) => setCriarUsuario(e.target.value)}
        />

        <TextField
          fullWidth
          label="Senha"
          type="password"
          variant="outlined"
          margin="normal"
          onChange={(e) => setSenha(e.target.value)}
        />

        <TextField
          fullWidth
          label="Confirmar Senha"
          type="password"
          variant="outlined"
          margin="normal"
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.5 }}
          onClick={registroUsuario}
        >
          Registrar
        </Button>
      </Paper>
    </Box>
    )
}

export default Registro 