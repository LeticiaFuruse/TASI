import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Link
} from 'react-router-dom';
import Menu from "./menu";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CssBaseline,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ListarCategorias = () => {
    var [categorias, setCategorias] = useState([])

    useEffect(() => {
        listarCategorias()
    }, [])

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

//escluir categoria
    const excluirCategoria = async (id) => {
    var url = "https://backend-completo.vercel.app/app/categorias"
    var dados ={
      id: id
    }
    var token = localStorage.getItem("ALUNO_ITE")

    await axios.delete(url,{
      data:dados,
      headers: { Authorization: `Bearer ${token}` }
    }).then(retorno => {
      console.log(retorno)
      if (retorno.data.error) {
        alert(retorno.data.error + " Erro ao mostrar")
        console.log(id)
        return
      }
      if (retorno.status === 200) {
        alert("Excluido com sucesso")
        console.log(retorno)
        listarCategorias()
      }
    })
  }

return (
  <CssBaseline>
    <Menu /> {/* Toolbar ADMIN visível em todas as páginas */}
  <Box sx={{ p: 3 }}>
    <Typography
      variant="h4"
      gutterBottom
      align="center"
      sx={{ fontSize: "36px", fontWeight: "bold", color: "#333333" }}
    >
      Categorias
    </Typography>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Categorias Table">
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
              Nome da Categoria
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
          {categorias.map((categoria) => (
            <TableRow key={categoria._id}>
              <TableCell sx={{ borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
                {categoria.usuario}
              </TableCell>
              <TableCell sx={{ borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
                {categoria.nome}
              </TableCell>
              <TableCell sx={{ borderBottom: "1px solid #ddd" }}>
                <Box display="flex" justifyContent="space-around">
                  <Link to={`/editarCategoria/${categoria._id}`}>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    color="error"
                    onClick={() => excluirCategoria(categoria._id)}
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
  </Box>
  </CssBaseline>

);



}

export default ListarCategorias