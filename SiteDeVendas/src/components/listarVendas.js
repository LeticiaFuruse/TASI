import React, { useState, useEffect } from "react";
import axios from "axios";
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


const ListarVendas = () => {
    var [vendas, setVendas] = useState([])

    useEffect(() => {
        listarVendas()
    }, [])

    const listarVendas = async () => {
        var url = "https://backend-completo.vercel.app/app/venda"
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
                setVendas(retorno.data)
                console.log(retorno)
            }
        })
    }

//excluirVenda
const excluirVenda = async (id) => {
    var url = "https://backend-completo.vercel.app/app/venda"
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
        listarVendas()
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
        Vendas
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Vendas Table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "18px",
                  backgroundColor: "#333333",
                  color: "white",
                  borderRight: "1px solid #ddd",
                }}
              >
                Usuário
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "18px",
                  backgroundColor: "#333333",
                  color: "white",
                  borderRight: "1px solid #ddd",
                }}
              >
                Nome do Cliente
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "18px",
                  backgroundColor: "#333333",
                  color: "white",
                  borderRight: "1px solid #ddd",
                }}
              >
                Data
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "18px",
                  backgroundColor: "#333333",
                  color: "white",
                  borderRight: "1px solid #ddd",
                }}
              >
                Produtos
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
            {vendas.map((venda) => (
              <TableRow key={venda._id}>
                <TableCell sx={{ borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
                  {venda.usuario}
                </TableCell>
                <TableCell sx={{ borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
                  {venda.nomeCliente}
                </TableCell>
                <TableCell sx={{ borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
                  {venda.data}
                </TableCell>
                <TableCell sx={{ borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
                  {venda.produtos.map((produto, i) => (
                    <div key={i}>
                      <span>{produto.nome} - </span>
                      <span>{produto.quantidade} - </span>
                      <span>R${produto.preco}</span>
                    </div>
                  ))}
                </TableCell>
                <TableCell sx={{ borderBottom: "1px solid #ddd" }}>
                  <Box display="flex" justifyContent="center">
                    <IconButton color="error" onClick={() => excluirVenda(venda._id)}>
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

export default ListarVendas