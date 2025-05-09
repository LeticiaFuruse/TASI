import React, { useState } from "react";
import axios from "axios";

const LimparTabelas = () => {


    const limparTabelas = async () => {
        var url = "https://backend-completo.vercel.app/app/"
        var token = localStorage.getItem("ALUNO_ITE")

        await axios.get(
            url,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(retorno => {
            console.log(retorno)
            if (retorno.data.error) {
                alert(retorno.data.error + " Erro ao limpar")
                console.log(retorno)
                return
            }
            if (retorno.status === 200) {
                alert("Limpo com sucesso")
                console.log(retorno)
            }
        })

    }

    return (
        <div>
            <h1>Limpar Todas as Tabelas</h1>
            <input type="button" value="Limpar"/>
        </div>
    )
}

export default LimparTabelas