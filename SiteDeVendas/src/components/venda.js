import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Paper,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Card,
  CardContent,
  CardMedia
} from "@mui/material";

const Venda = () => {
    var [nomeCliente, setNomeCliente] = useState('')
    var [data, setData] = useState('')
    var [produtos, setProdutos] = useState([])
    const [produtosVendidos, setProdutosVendidos] = useState([])

    var usuario = localStorage.getItem("USUARIO");


    const criarVenda = async () => {
        var url = "https://backend-completo.vercel.app/app/venda"
        var dados = {
            nomeCliente: nomeCliente,
            data: data,
            produtos: produtosVendidos 
        }
        var token = localStorage.getItem("ALUNO_ITE")
        await axios.post(
            url,
            dados,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            if (retorno.data.error) {
                alert(retorno.data.error + " Erro ao registrar")
                console.log(retorno)
                return
            }
            if (retorno.data._id) {
                alert("Registrado com sucesso")
                console.log(retorno)
            }
        })
    }
// executa a função na hora que a pagina é aberta
    useEffect(() => {
        listarProduto();
    }, []);


    const listarProduto = async () => {
        var url = `https://backend-completo.vercel.app/app/produtos/${usuario}/`;
        var token = localStorage.getItem("ALUNO_ITE")
        var token = localStorage.getItem("USUARIO")
        
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
                
                setProdutos(retorno.data)
                console.log(retorno)
            }
        })
    }
return (
  <Box sx={{ p: 3 }}>
    <Paper
      elevation={3}
      sx={{
        p: 3,
        bgcolor: "#2c2c2c",
        color: "#fff",
        maxWidth: 900,
        margin: "0 auto"
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
        Registrar Venda
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        <TextField
          label="Nome do Cliente"
          variant="outlined"
          fullWidth
          onChange={(e) => setNomeCliente(e.target.value)}
          InputProps={{
            sx: {
              backgroundColor: "#555",
              color: "#fff",
              "& input": { color: "#fff" } // texto digitado branco
            }
          }}
          InputLabelProps={{ sx: { color: "#fff" } }}
        />
        <TextField
          type="date"
          variant="outlined"
          fullWidth
          onChange={(e) => setData(e.target.value)}
          InputProps={{
            sx: {
              backgroundColor: "#555",
              color: "#fff",
              "& input": { color: "#fff" } // texto da data branco
            }
          }}
          InputLabelProps={{ shrink: true, sx: { color: "#fff" } }}
        />
      </Box>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Produtos disponíveis
      </Typography>

      <FormGroup>
        {produtos.map((produto, indice) => (
          <Card
            key={indice}
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#444",
              color: "#fff",
              mb: 2,
              p: 1
            }}
          >
            <CardMedia
              component="img"
              image={produto.imagem}
              alt={produto.nome}
              sx={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 1,
                mr: 2
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">{produto.nome}</Typography>
              <Typography variant="body2">Quantidade: {produto.quantidade}</Typography>
              <Typography variant="body2">Preço: R$ {produto.preco}</Typography>
            </CardContent>
            <FormControlLabel
              control={
                <Checkbox
                  checked={produtosVendidos.some((p) => p._id === produto._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setProdutosVendidos([...produtosVendidos, produto]);
                    } else {
                      setProdutosVendidos(
                        produtosVendidos.filter((p) => p._id !== produto._id)
                      );
                    }
                  }}
                  sx={{ color: "#fff" }}
                />
              }
              label="Selecionar"
            />
          </Card>
        ))}
      </FormGroup>

      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          backgroundColor: "#1976d2", // Azul escuro
          color: "#fff",              // Texto branco
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#115293" // Azul mais escuro no hover
          },
          py: 1.5
        }}
        onClick={criarVenda}
      >
        Concluir Venda
      </Button>
    </Paper>
  </Box>
);

}

export default Venda