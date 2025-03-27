import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <Texto />
  </React.StrictMode>
);

function Texto(){
  //criando a variavel valor e setando ela (utilizando o React)
  var [valor, setValor] = React.useState()
  // criando uma sub função que ira setar o valor e mult por 5, pegando o valor inserido
  function mudarValor(e) {
    setValor(e.target.value * 5)
  }
  // retorna um input onde ira pegar o valor do input mult e mostrar no span 
  return (
    <div>
      <input type="text"
        onChange = {(e) => mudarValor (e)}
      />
      {/* mostrando na tela a variavel valor que possui um numero que sera mult */}
      <span> { valor } </span>
      <hr/>
    </div>
  )
}
