import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


// cartão teste para ver como estaria ficando, sem modificar aplicação
// Utilizando os componentes do Material UI
// Spoiler: não usei pq vi um video de uma angolano explicando como usar a API e usei o exemplo dele

const cartao = () =>{
    return (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Aqui seria um TITULO
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Aqui seria uma breve descrição: Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      );
}

export default cartao;