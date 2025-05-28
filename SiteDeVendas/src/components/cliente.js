import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuCliente from "./menuCliente";

import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Modal,
  TextField,
  Container,
} from "@mui/material";

const Cliente = () => {
  const [produtos, setProdutos] = useState([]);
  const usuario = localStorage.getItem("USUARIO");
  const [categorias, setCategorias] = useState([]);
  const [search, setSearch] = useState(""); // estado da barra de pesquisa
  const [openModal, setOpenModal] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  // executar a função
  const listarProduto = async () => {
    var url = `https://backend-completo.vercel.app/app/produtos/${usuario}/`;
    var token = localStorage.getItem("ALUNO_ITE");

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


  const buscarPorNome = async (nome) => {
    var url = `https://backend-completo.vercel.app/app/produtos/${usuario}/${nome}`;
    var token = localStorage.getItem("ALUNO_ITE");

    if (nome.trim() === "") {
      listarProduto(); // volta à lista completa se estiver vazio
      return;
    }

    await axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((retorno) => {
        if (retorno.data.error) {
          alert(retorno.data.error);
          return;
        }
        if (retorno.status === 200) {
          setProdutos(retorno.data);
        } else {
          alert("Conexão com Servidor Falhou");
        }
      });
  };

  // Depois de listar as categorias do backend, adicionamos "Todos" manualmente
  const listarCategorias = async () => {
    var url = "https://backend-completo.vercel.app/app/categorias";
    var token = localStorage.getItem("ALUNO_ITE");

    await axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then((retorno) => {
      if (retorno.data.error) {
        alert(retorno.data.error + " Erro ao mostrar");
        return;
      }
      if (retorno.status === 200) {
        // Insere "Todos" no início da lista
        setCategorias([{ _id: "todos", nome: "Todos" }, ...retorno.data]);
        // Seleciona "Todos" inicialmente para mostrar todos os produtos
        setCategoriaSelecionada("Todos");
      }
    });
  };

  const handleOpenModal = (produto) => {
    setProdutoSelecionado(produto);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setProdutoSelecionado(null);
  };


  const adicionarAoCarrinho = (produto) => {
    const carrinho = JSON.parse(localStorage.getItem("CARRINHO")) || [];

    const produtoExistente = carrinho.find((item) => item._id === produto._id);

    if (produtoExistente) {
      alert("Produto já está no carrinho!");
      return;
    }

    carrinho.push(produto);
    localStorage.setItem("CARRINHO", JSON.stringify(carrinho));
    alert("Produto adicionado no carrinho!");
  };

  // filtrar produto
  const produtosFiltrados =
    categoriaSelecionada && categoriaSelecionada !== "Todos"
      ? produtos.filter((p) => p.categoria === categoriaSelecionada)
      : produtos;


  // Chama a função assim que o componente carregar
  useEffect(() => {
    listarProduto();
    listarCategorias();
  }, []);


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      buscarPorNome(search);
    }, 500); // Delay de 500ms para evitar muitas requisições rápidas

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
          </Box>

          {/* Categorias vindo do backend */}
          <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
            {categorias.map((cat) => (
              <Button
                key={cat._id}
                variant={categoriaSelecionada === cat.nome ? "contained" : "outlined"}
                sx={{ color: "white", borderColor: "gray" }}
                onClick={() => setCategoriaSelecionada(cat.nome)}
              >
                {cat.nome}
              </Button>
            ))}
          </Box>

          {/* Lista de Produtos */}
          <Grid container spacing={3}>
            {produtosFiltrados.map((produto) => (

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

                  <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
                    R$ {produto.preco.toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ bgcolor: "#1976d2", mt: 1 }}
                    onClick={() => handleOpenModal(produto)}
                  >
                    Ver Detalhes
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            maxHeight: "80vh",
            overflowY: "auto",
            bgcolor: "#1e1e1e",
            border: "2px solid #1976d2",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            color: "white",
          }}
        >
          {produtoSelecionado && (
            <>
              <Box
                component="img"
                src={produtoSelecionado.imagem}
                alt={produtoSelecionado.nome}
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 2,
                }}
              />
              <Typography variant="h5" sx={{ mb: 1 }}>
                {produtoSelecionado.nome}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mb: 2,
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {produtoSelecionado.descricao}
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 2 }}>
                Preço: R$ {produtoSelecionado.preco.toFixed(2)}
              </Typography>

              <Button
                variant="contained"
                fullWidth
                sx={{ bgcolor: "#1976d2" }}
                onClick={() => {
                  adicionarAoCarrinho(produtoSelecionado);
                  handleCloseModal();
                }}
              >
                Adicionar no carrinho
              </Button>
            </>
          )}
        </Box>
      </Modal>

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
