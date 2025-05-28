import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuCliente from "./menuCliente";

import { Box, Container, Button, Grid, Paper, TextField, Typography } from "@mui/material";

const Cliente = () => {
  const [produtos, setProdutos] = useState([]);
  const usuario = localStorage.getItem("USUARIO");
  const [categorias, setCategorias] = useState([]);

  // executar a função
  const listarProduto = async () => {
    var url = `https://backend-completo.vercel.app/app/produtos/${usuario}/`;
    var token = localStorage.getItem("ALUNO_ITE");
    var token = localStorage.getItem("USUARIO");

    await axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then((retorno) => {
      console.log(retorno);
      if (retorno.data.error) {
        alert(retorno.data.error + " Erro ao mostrar");
        console.log(retorno);
        return;
      }
      if (retorno.status === 200) {
        setProdutos(retorno.data);
        console.log(retorno);
      }
    });
  };

 const listarCategorias = async () => {
        var url = "https://backend-completo.vercel.app/app/categorias"
        var token = localStorage.getItem("ALUNO_ITE")

        await axios.get(
            url,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            console.log(retorno)
            if (retorno.data.error) {
                alert(retorno.data.error + " Erro ao mostrar")
                console.log(retorno)
                return
            }
            if (retorno.status === 200) {
                setCategorias(retorno.data)
                console.log(retorno)
            }
        })
    }


  // Chama a função assim que o componente carregar
  useEffect(() => {
    listarProduto();
    listarCategorias();
  }, []);

  return (
    <div>
      <MenuCliente />

      <Box sx={{ bgcolor: "#454545", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="lg">
          {/* Barra de Pesquisa */}
          <Box sx={{ mb: 4, display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Pesquisar Produtos"
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "gray" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
              }}
            />
            <Button variant="contained" sx={{ bgcolor: "#1976d2" }}>
              Pesquisar
            </Button>
          </Box>

          {/* Categorias vindo do backend */}
          <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
            {categorias.map((cat) => (
              <Button
                key={cat._id}
                variant="outlined"
                sx={{ color: "white", borderColor: "gray" }}
              >
                {cat.nome}
              </Button>
            ))}
          </Box>

          {/* Lista de Produtos */}
          <Grid container spacing={3}>
            {produtos.map((produto) => (
              <Grid item xs={12} sm={6} md={4} key={produto._id}>
                <Paper
                  sx={{
                    bgcolor: "#1e1e1e",
                    color: "white",
                    p: 2,
                    borderRadius: 2,
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <Box
                    component="img"
                    src={produto.imagem}
                    alt={produto.nome}
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6">{produto.nome}</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {produto.descricao}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
                    R$ {produto.preco.toFixed(2)}
                  </Typography>
                  <Button variant="contained" fullWidth sx={{ bgcolor: "#1976d2", mt: 1 }}>
                    Ver Detalhes
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "#000", color: "white", py: 2, textAlign: "center" }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Minha Loja. Todos os direitos reservados.
        </Typography>
      </Box>
    </div>
  );
};

export default Cliente;
