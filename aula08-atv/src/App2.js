import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Para estilizacao
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

// Utilizei esse arquivo para chamar a aplicação do RICK AND MORTY
// Neste codigo aparece 20 cards com todas as informações dos personagens
// Utilizei bibliotecas e componentes do Material UI, que se encontra na Documentação

// Componente principal da aplicação
const App = () => {
  // Declara "characters" para armazenar os personagens da API
  const [characters, setCharacters] = useState([]);

    //Utilizando o useEffect para buscar os personagens da API
  useEffect(() => {
    // buscar os personagens da API
    const fetchCharacters = async () => {
        // await = aguarde o axios
        // response serve para armazenar os personagens
        const response = await axios.get("https://rickandmortyapi.com/api/character/?page=1");
        setCharacters(response.data.results);
    };

    // chama a funcao
    fetchCharacters();
  }, []);

  return (
    <div>
      <h1>Rick and Morty - Caracteristicas</h1>
      <Grid container spacing={2}>
        {/* Utilizando o map para percorrer os personagens */}
        {characters.map((character) => (
          <Grid item key={character.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia component="img" alt={character.name} height="300" image={character.image} />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {character.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  🟢 {character.status} - {character.species}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Origem: {character.origin.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Localização: {character.location.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

// Exporta o componente principal
export default App;
