import React, { useState } from "react";
import  { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  IconButton,
  Divider,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close"; // Ícone para fechar o menu lateral
import MenuIcon from "@mui/icons-material/Menu"; // Ícone para abrir o menu (hambúrguer)

const Menu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { path: "/pessoas", label: "Pessoas" },
    { path: "/registro", label: "Registro" },
    { path: "/login", label: "Login" },
  ];

  const linksProdutos = [
    { path: "/produtos", label: "Produtos" },
    { path: "/listarProduto", label: "Listar Produto" },
  ];

  const linksCategorias = [
    { path: "/categorias", label: "Categoria" },
    { path: "/listarCategoria", label: "Listar Categoria" },
  ];

  const linksVendas = [
    { path: "/venda", label: "Venda" },
    { path: "/listarVendas", label: "Listar Vendas" },
  ];

  const toggleDrawer = (open) => {
    setOpen(open);
  };

  const logout = () => {
    localStorage.removeItem("ALUNO_ITE");
    localStorage.removeItem("USUARIO");
    navigate("/login");

    setTimeout (() =>{
      navigate("/login")
    },750)
  };
  

  return (
    <div>
      {/* AppBar (topo do menu) */}
      <AppBar position="static" sx={{ backgroundColor: "#2c2c2c", mb: 4 }}>
        <Toolbar sx={{ flexWrap: "wrap", gap: 1 }}>
          <Button
            onClick={() => toggleDrawer(true)}
            startIcon={<MenuIcon />}
            sx={{ color: "white", textTransform: "none" }}
          >
            Menu
          </Button>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "white", textAlign: "center" }}>
            Sistema de Controle
          </Typography>
          <Button component={Link} to="/" sx={{ color: "white", textTransform: "none" }}>
            Principal
          </Button>
        </Toolbar>
      </AppBar>

      {/* Menu lateral (Drawer) */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#333", // Cor de fundo cinza escuro
            color: "white", // Cor das letras
          },
        }}
      >
        <div style={{ width: 250, height: "100%" }}>
          {/* Botão de Fechar */}
          <IconButton
            onClick={() => toggleDrawer(false)}
            sx={{
              color: "white",
              padding: "10px",
              alignSelf: "flex-end",
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Lista de links (Pessoas, Registro, Login) */}
          <List sx={{ paddingTop: "40px" }}>
            {links.map((item, index) => (
              <ListItem button key={index}>
                <ListItemButton component={Link} to={item.path} sx={{ textTransform: "none", color: "white" }}>
                  {item.label}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)", my: 1, borderWidth: 0.25 }} />

          <List>
            {linksProdutos.map((item, index) => (
              <ListItem button key={index}>
                <ListItemButton component={Link} to={item.path} sx={{ textTransform: "none", color: "white" }}>
                  {item.label}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)", my: 1, borderWidth: 0.25 }} />

          <List>
            {linksCategorias.map((item, index) => (
              <ListItem button key={index}>
                <ListItemButton component={Link} to={item.path} sx={{ textTransform: "none", color: "white" }}>
                  {item.label}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)", my: 1, borderWidth: 0.25 }} />

          <List>
            {linksVendas.map((item, index) => (
              <ListItem button key={index}>
                <ListItemButton component={Link} to={item.path} sx={{ textTransform: "none", color: "white" }}>
                  {item.label}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)", my: 1, borderWidth: 0.25 }} />

          <List>
            <ListItem button>
              <ListItemButton
                sx={{
                  textTransform: "none",
                  color: "white",
                  backgroundColor: "#ff4d4d",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  "&:hover": {
                    backgroundColor: "#ff2a2a",
                  },
                }}
                component={Link}
                to="/limparTabelas"
              >
                Limpar
              </ListItemButton>
            </ListItem>
          </List>

          <List>
            <ListItem button>
              <ListItemButton
                sx={{
                  textTransform: "none",
                  color: "white",
                  backgroundColor: "#ff4d4d",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  "&:hover": {
                    backgroundColor: "#ff2a2a",
                  },
                }}
                component={Link} onClick={logout}
              >
                Sair
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Menu;
