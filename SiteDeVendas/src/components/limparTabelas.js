import React from "react";
import axios from "axios";

const LimparTabelas = () => {

    const limparTabelas = async () => {
        var url = "https://backend-completo.vercel.app/app/limpar"
        var token = localStorage.getItem("ALUNO_ITE")

        await axios.get(
            url,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            if (retorno.data.erro) {
                alert(retorno.data.erro)
                return
            }
            if (retorno.status === 200) {
                alert(retorno.data.mensagem)
                console.log(retorno)
            }
        })

    }

    return (
        <div>
            <h1>Limpar Todas as Tabelas</h1>
            <input type="button" value="Limpar Tabelas" onClick={() => limparTabelas()}/>
        </div>
    )
}

export default LimparTabelas