import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// componente que lista os produtos
const ListarProduto = () => {
  // começa um array vazio
  var [produtos, setProdutos] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    listarProduto();
  }, []);

  // executar a função
  const listarProduto = async () => {
    var url = "https://backend-completo.vercel.app/app/produtos";
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

  // executar a função
  const excluirProduto = async (id) => {
    var url = "https://backend-completo.vercel.app/app/produtos";
    var dados = {
      id: id,
    };
    var token = localStorage.getItem("ALUNO_ITE");

    await axios
      .delete(url, {
        data: dados,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((retorno) => {
        console.log(retorno);
        if (retorno.data.error) {
          alert(retorno.data.error + " Erro ao mostrar");
          console.log(id);
          return;
        }
        if (retorno.status === 200) {
          alert("Excluido com sucesso");
          console.log(retorno);
          listarProduto();
        }
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (

    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontSize: "36px", fontWeight: "bold", color: "#333333" }}
      >
        Produtos
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Produtos Table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "18px",
                  backgroundColor: "#333333",
                  color: "white",
                  borderRight: "1px solid #ddd", // Linha entre as colunas
                }}
              >
                Usuário
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "18px",
                  backgroundColor: "#333333",
                  color: "white",
                  borderRight: "1px solid #ddd", // Linha entre as colunas
                }}
              >
                Nome
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "18px",
                  backgroundColor: "#333333",
                  color: "white",
                  borderRight: "1px solid #ddd", // Linha entre as colunas
                }}
              >
                Quantidade
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "18px",
                  backgroundColor: "#333333",
                  color: "white",
                  borderRight: "1px solid #ddd", // Linha entre as colunas
                }}
              >
                Preço
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "18px",
                  backgroundColor: "#333333",
                  color: "white",
                  borderRight: "1px solid #ddd", // Linha entre as colunas
                }}
              >
                Categoria
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "18px",
                  backgroundColor: "#333333",
                  color: "white",
                  borderRight: "1px solid #ddd", // Linha entre as colunas
                }}
              >
                Descrição
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "18px",
                  backgroundColor: "#333333",
                  color: "white",
                  borderRight: "1px solid #ddd", // Linha entre as colunas
                }}
              >
                Imagem
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "18px",
                  backgroundColor: "#333333",
                  color: "white",
                }}
              >
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((prod) => (
                <TableRow key={prod._id}>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {prod.usuario}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {prod.nome}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {prod.quantidade}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {prod.preco}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {prod.categoria}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    {prod.descricao}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                    <img
                      width={80}
                      src={prod.imagem}
                      alt="imagem"
                      style={{ objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="space-around">
                      <Link to={`/editarProduto/${prod._id}`}>
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        color="error"
                        onClick={() => excluirProduto(prod._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={produtos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>

  );
};

export default ListarProduto;
