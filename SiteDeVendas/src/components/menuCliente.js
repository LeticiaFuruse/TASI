import React from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";

const menuCliente = () => {
return (
    <div>
      <CssBaseline />
      {/* AppBar (Menu Superior) */}
      <AppBar position="static" sx={{ backgroundColor: "#000" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Loja Online
          </Typography>

          <Tooltip title="Carrinho">
            <IconButton color="inherit">
              <img
                src="/carrinho-compra.png"
                alt="Carrinho"
                width="24"
                height="24"
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Conta">
            <IconButton color="inherit">
              <img
                src="/icon_usuario.png"
                alt="Conta"
                width="24"
                height="24"
              />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default menuCliente;
