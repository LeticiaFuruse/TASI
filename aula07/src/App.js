import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // tudo a partir de agora ira utilizar esse tema
import CssBaseline from "@mui/material/CssBaseline";
import MenuPrincipal from "./template/MenuPrincipal";


//definir cores temas da tela e do menu bar 
const tema = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#1976d2",
        },
    },
});

//definir componente 
const App = () => {
  return (
      <ThemeProvider theme={tema}>
        <CssBaseline />
        <MenuPrincipal />
      </ThemeProvider>
  );
};

export default App;
