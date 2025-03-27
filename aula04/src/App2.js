import React, { useState } from 'react'
import data from './data.json'

// Aula de hoje sera de: 
    //chamando a tabela .json dentro do react
    //toLocaleLowerCase serve para transformar tudo em minusculo 
    ///atividade: criar uma barra de pesquisa para a tabela

    
function App() {
    const [search, setSearch] = useState('');
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <input style={{marginBottom: '20px', width: '300px', height: '30px'}} type="text" placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <table style={{border: '1px solid black', borderCollapse: 'collapse' }} border={1}>
          <thead>
            <tr style={{background: 'lightgreen', color: 'black'}}>
              <th>NAME</th>
              <th>AGE</th>
              <th>EMAIL</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} style={{background: index % 2 === 0 ? 'lightgray' : 'white'}}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
export default App