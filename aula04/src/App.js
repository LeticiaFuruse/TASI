import React from 'react';
import axios from 'axios';

// async: função assíncrona, função que não é executada imediatamente
//await:    
//atividade: utilizar a API para criar uma tabela com as informações dos persoagens 

const App = () =>{
    var [dados, setDados] = React.useState([])
    const buscarDados = async () => {
        var url = 'https://rickandmortyapi.com/api/character'

        await axios.get(url).then( resposta => {
            console.log(resposta.data.results)
        })
    }

    return(
        <div>
            <input type='button'  value="Buscar"  onClick={ () => buscarDados() } />
        </div>
    )
}
export default App