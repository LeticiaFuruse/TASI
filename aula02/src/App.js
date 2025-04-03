import React from 'react'
//Arrow function 
//function App() {}


const App = () => {

    var [valor, setValor] = React.useState(0)

    var numero = 4
    numero = numero * 8 
    //console.log(numero) --> apertar tecla f12 no navegador e ir na aba console 
    
    const Clique = () => {
        numero = numero + 10 
        setValor(valor + 1)
        console.log(numero)
    }

    return (
        <div>
            <h1>Ola Mundo</h1>
            <h2>Hoje é: {new Date().toLocaleDateString()} </h2>
            <h3 style={{color: 'red'}}>O numero * 8 = {numero}</h3>
            <input type='button' 
                onClick={ () => { Clique() } } 
                value="Aumentar valor"
            />
            <h3>O numero + 1: {valor}</h3>
        </div>
    )
}

export default App