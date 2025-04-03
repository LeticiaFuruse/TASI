import React, { useState } from "react";
import axios from 'axios'


const Login = () => {
  var [usuario, setUsuario] = useState("");
  var [senha, setSenha] = useState("");

  const ValidaUsuario = async () =>{
    var url = "https://backend-aula.vercel.app/app/login"
    var dados = { 
        //usuario do backend: minha variavel usuario
        usuario: usuario, 
        senha
    }

    await axios.post(
        url,
        dados
    ).then(retorno => {
        console.log( retorno )
        //retorno popup do backend onde informa o erro
        if (retorno.data.erro){
            alert( retorno.data.erro )
            return 
        }
        // retorno popup do backend onde informa o sucesso
        if(retorno.data.token){
            localStorage.setItem("ALUNO_ITE", retorno.data.token)
        }
    })

   //localStorage.setItem("ALUNO_ITE", "OK")
    
  }
  return (
    <div>
      <h1>Faça seu Login</h1>
        <input type="text" placeholder="usuario" 
            onChange={(e) => setUsuario(e.target.value)}
        />
        <input type="password" placeholder="senha" 
            onChange={(e) => setSenha(e.target.value)}
        />
        <input type="button" placeholder="Login" 
            onClick={ () => ValidaUsuario() }
        />
            
    </div>
  );
};

export default Login;
