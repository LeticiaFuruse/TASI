import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // tudo a partir de agora ira utilizar esse tema
import CssBaseline from "@mui/material/CssBaseline";
import MenuPrincipal from "./template/MenuPrincipal";
import axios from "axios";
import App2 from "./App2"; // meu app contem todos os cards dos persoangens

const buscarDados = async () => {
  var url = "https://rickandmortyapi.com/api/character";

  await axios.get(url).then((resposta) => {
    console.log(resposta.data.results);
  });
};

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
      {/* Botao puxa no console as info dos persoangens */}
      <input type="button" value="Botão para o console.log" onClick={() => buscarDados()} />
      {/* Aqui ele chama meu App2 para meu "index" */}
      <App2/>
    </ThemeProvider>
  );
};

export default App;
