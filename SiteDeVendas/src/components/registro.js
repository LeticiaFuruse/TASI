import React, {useState} from "react";
import axios from "axios";

const Registro = () => {
    var [criarUsuario, setCriarUsuario] = useState('')
    var [senha, setSenha] = useState('')
    var [confirmarSenha, setConfirmarSenha] = useState('')

    const registroUsuario = async () => {
        var url = "https://backend-completo.vercel.app/app/registrar"
        var dados = {
            usuario:criarUsuario,
            senha,
            confirma: confirmarSenha
        }

        await axios.post(
            url,
            dados
        ).then(retorno =>{
            console.log( retorno )
            if (retorno.data.erro){
                alert(retorno.data.erro + " Erro ao registrar")
                return
            }
            if(retorno.data._id){
                alert("Registrado com sucesso")
            }
        })
    }

    return(
        <div>
            <h1>Registre-se</h1>

            <input type="text" placeholder="Usuario" onChange={(e) => setCriarUsuario(e.target.value)}/>
            <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)}/>
            <input type="password" placeholder="Confirmar Senha" onChange={(e) => setConfirmarSenha(e.target.value)}/>
            <input type="button" value="Registrar" onClick={() => registroUsuario()}/>
        </div>
    )
}

export default Registro 