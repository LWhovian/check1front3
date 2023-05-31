import { useState } from 'react'
import './App.css'

function App() {

  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const[listaAtividades, setListaAtividades] = useState([]);

  function addAtividade(event){
    event.preventDefault();


    if(titulo.length < 3 || titulo.charAt(0) == ' ') {
      alert("Por favor, verifique os dados inseridos no formulário")
      return
    }

    if(descricao.length < 6 || descricao.matches(".*\\d.*") ){
      alert("Por favor, verifique os dados inseridos no formulário")
      return
    }

    if(id){
      const copiaListaAtividades = [...listaAtividades];
      const index = copiaListaAtividades.findIndex((Atividade) => Atividade.id === id);

      copiaListaAtividades[index].titulo = titulo
      copiaListaAtividades[index].descricao = descricao

    } else {
          setListaAtividades([
      ...listaAtividades, 
      {
      id: Date.now(),
      titulo: titulo,
      descricao:descricao,
    }
   ]);
  }

   setId("")
   setTitulo("")
   setDescricao("")
  }


  return (
    <div className="container">
      <div className='left'>
      <form className='form' onSubmit={addAtividade}>
        
        <h4>Cadastrar Atividade</h4>

        <input  
        value={titulo} 
        onChange={(event) => setTitulo(event.target.value)}
        placeholder="Título"
        className='titulo'/>

        <textarea name="descricao" placeholder="Descrição"
        value={descricao}
        onChange={(event) => setDescricao(event.target.value)}
        className="descricao"
        ></textarea>

        <input className='salvar' type="submit" value={id ? "Salvar" : "Cadastrar"} />
      </form>
      </div>

      <div className='right'>
        <div className='bottom'>
        <h1>Minhas Atividades</h1>
        <h3 className='total'>Total: {listaAtividades.length} </h3>
        </div>

      {
        listaAtividades.length > 0 ? (

         <ul id='lista'>
          {listaAtividades.map((Atividade) => (
            <li className='item' key={Atividade.id}>
             <h3 id='titulo'>{Atividade.titulo}</h3>
             <p id='descricao'>{Atividade.descricao}</p>

            </li>
            ))}
         </ul>
      ) : (
        <p className='noTask'>Sem atividades.</p>
      )}
      </div>
    </div>
    )
  }


export default App;
