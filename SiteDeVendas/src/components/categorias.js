import React, {useState} from "react";
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



    return(
        <Box sx={{ padding: 3 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    margin: "0 auto",
                    bgcolor: '#333', // Cor de fundo do Paper (preto fosco)
                    color: '#fff', // Cor do texto (branco)
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
                        color: "#fff", // Cor do título (branco)
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
                            backgroundColor: "#555", // Cor de fundo do input (cinza escuro)
                            color: "#fff", // Texto branco
                            "& .MuiInputLabel-root": {
                                color: "#fff" // Cor do label branco
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#777" // Borda cinza claro
                                },
                                "&:hover fieldset": {
                                    borderColor: "#fff" // Cor da borda ao passar o mouse
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#fff" // Cor da borda quando estiver focado
                                }
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => criarCategoria()}
                        sx={{
                            backgroundColor: "#444", // Cor de fundo do botão
                            color: "#fff", // Texto branco
                            fontWeight: "bold",
                            "&:hover": {
                                backgroundColor: "#666", // Cor ao passar o mouse
                            }
                        }}
                    >
                        Registrar
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default Categorias