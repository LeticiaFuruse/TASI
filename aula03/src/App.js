import React, { useState } from 'react'
import Filho from './component/Filho'


const App = () => {
    var [getValor,setValor] = useState()
    var [getValorCor,setValorCor] = useState()
    return(
        <div style={
        {
            display: "flex",
            flexDirection: "column",
            marginLeft: "25%",
            marginRight: "25%",
            gap: "10px",
            padding: "10px"
            }
        }>
            Digite um Texto: <input type='text' onChange={(e) => setValor(e.target.value)}/>
            <br></br>
            Digite uma cor(ingles): <input type='text' onChange={(e) => setValorCor(e.target.value)}/>
            <Filho texto={ getValor } cor={ getValorCor }/>
        </div>
    
    )
}



export default App