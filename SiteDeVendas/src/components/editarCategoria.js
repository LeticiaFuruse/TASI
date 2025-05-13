import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // pegar o id do prodto da URL

const EditarCategoria = () => {
  const { idCategoria } = useParams(); // id  da URL
  const navigate = useNavigate(); // redirecionar após a edição

  var [categoria, setCategoria] = useState('');


  //manda para o banco atualizado
  const editarCategoria = async () => {
    var url = `https://backend-completo.vercel.app/app/categorias`;
    var dados = {
      id: idCategoria,
      nome_categoria: categoria,
    };
    var token = localStorage.getItem("ALUNO_ITE");

    await axios.put(url, dados, { headers: { Authorization: `Bearer ${token}` } }).then((retorno) => {
      if (retorno.data.error) {
        alert(retorno.data.error + " Erro ao editar produto");
        console.log(retorno);
        return;
      }
      if (retorno.status === 200) {
        alert("Categoria editada com sucesso");
        navigate("/listarCategoria"); // volta para lista de produtos
      }
    })
  }
  useEffect(() => {
    listarCategorias();
  }, []);


//puxa todas as categorias do banco
  const listarCategorias = async () => {
    var url = "https://backend-completo.vercel.app/app/categorias";
    var token = localStorage.getItem("ALUNO_ITE");

    await axios.get(
        url, 
        { headers: { Authorization: `Bearer ${token}` } }
    ).then((retorno) => {
      console.log(retorno);
      if (retorno.data.error) {
        alert(retorno.data.error + " Erro ao mostrar");
        console.log(retorno);
        return;
      }


      //compara o ID da categoria selecionada e descarta o resto
      if (retorno.status === 200) {
        //categoria recebe o array da categoria clicada [id, nome]
        const categoriaSelecionada = 
        // find = testa um por um e compara com o ID 
        retorno.data.find(cat => cat._id === idCategoria)
        //se ele achar o ID, ele seta o nome da categoria na variavel
            setCategoria(categoriaSelecionada.nome)
        }
    })
  }

  return (
    <div>
      <h1>Editar Categoria</h1>
      <div>
        <label>Nome da Categoria</label>
        <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
      </div>
      <div>
        <button onClick={editarCategoria}>Salvar Alterações</button>
      </div>
    </div>
  );
};

export default EditarCategoria;
