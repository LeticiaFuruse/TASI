import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
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

    setTimeout(() => {
      navigate("/login");
    }, 750);
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#2c2c2c", mb: 4 }}>
        <Toolbar sx={{ flexWrap: "wrap", gap: 1 }}>
          <Button
            onClick={() => toggleDrawer(true)}
            startIcon={<MenuIcon />}
            sx={{ color: "white", textTransform: "none" }}
          >
            Menu
          </Button>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            Sistema de Controle
          </Typography>
          <Button
            component={Link}
            to="/"
            sx={{ color: "white", textTransform: "none" }}
          >
            Loja Online
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#333",
            color: "white",
            width: 320,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          },
        }}
      >
        <Box sx={{ width: 320, flexGrow: 1 }}>
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

          <List sx={{ paddingTop: "20px" }}>
            {links.map((item, index) => (
              <ListItem button key={index}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{ textTransform: "none", color: "white" }}
                >
                  {item.label}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)", my: 1 }} />

          <List>
            {linksProdutos.map((item, index) => (
              <ListItem button key={index}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{ textTransform: "none", color: "white" }}
                >
                  {item.label}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)", my: 1 }} />

          <List>
            {linksCategorias.map((item, index) => (
              <ListItem button key={index}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{ textTransform: "none", color: "white" }}
                >
                  {item.label}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)", my: 1 }} />

          <List>
            {linksVendas.map((item, index) => (
              <ListItem button key={index}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{ textTransform: "none", color: "white" }}
                >
                  {item.label}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)", my: 1 }} />

          <List>
            <ListItem button>
              <ListItemButton
                component={Link}
                to="/limparTabelas"
                sx={{ textTransform: "none", color: "white" }}
              >
                Limpar
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        {/* Botão Sair fixado ao fim do Drawer */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingBottom: 2,
          }}
        >
          <ListItemButton
            sx={{
              width: "40%",
              margin: "0 30px",
              textTransform: "none",
              color: "white",
              backgroundColor: "#ff4d4d",
              borderRadius: "12px",
              padding: "6px 12px",
              fontSize: "0.875rem",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: "#ff2a2a",
              },
            }}
            onClick={logout}
          >
            Sair
          </ListItemButton>
        </Box>
      </Drawer>
    </div>
  );
};

export default Menu;
