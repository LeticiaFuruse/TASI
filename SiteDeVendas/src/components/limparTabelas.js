import React from "react";
import axios from "axios";
import { Button, Typography, Box, Paper, CssBaseline } from "@mui/material";
import Menu from "./menu";
const LimparTabelas = () => {
  const limparTabelas = async () => {
    var url = "https://backend-completo.vercel.app/app/limpar";
    var token = localStorage.getItem("ALUNO_ITE");

    await axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((retorno) => {
        if (retorno.data.erro) {
          alert(retorno.data.erro);
          return;
        }
        if (retorno.status === 200) {
          alert(retorno.data.mensagem);
          console.log(retorno);
        }
      });
  };

  return (
    <CssBaseline>
      <Menu /> {/* Toolbar ADMIN visível em todas as páginas */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Centraliza horizontalmente
        padding: 2, // Adiciona um pequeno padding nas laterais
      }}
    >
      
      <Paper
        sx={{
          padding: 4,
          backgroundColor: "#212121", // Cor preta fosca/cinza
          color: "white", // Texto branco
          borderRadius: 2,
          textAlign: "center", // Centraliza o texto dentro do Paper
          width: "60%", // Ajuste a largura conforme necessário
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Limpar Todas as Tabelas
        </Typography>

        <Typography variant="h6" sx={{ color: "yellow", marginBottom: 3 }}>
          CUIDADO: ao clicar no botão você irá excluir todo o conteudo das tabelas.
        </Typography>

        <Button
          variant="contained"
          color="error"
          onClick={() => limparTabelas()}
          sx={{
            borderRadius: 3,
            padding: "10px 20px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#d32f2f", // Cor do botão ao passar o mouse
            },
          }}
        >
          Limpar Tabelas
        </Button>
      </Paper>
    </Box>
    </CssBaseline>

  );
};

export default LimparTabelas;
