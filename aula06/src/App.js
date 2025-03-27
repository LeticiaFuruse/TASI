import React from 'react';
import axios from 'axios'
/* Metodo 
    PATH 
    GET 
    POST 
    DELETE
*/

const App = () => {
    //API
    //função async para buscar os dados da API
    const Buscar = async()=>{
        const url = "http://viacep.com.br/ws/17013421/json/"
        //await = aguarde o axios 
        await axios.get( url )
            .then( retorno => {
                console.log( retorno )
            } )
            .catch( erro => {

            })
            console.log("oi")
    }
    return(
        <div>
            <input type="text" value="Buscar" onClick={ () => Buscar() } />
        </div>
    );
};

export default App