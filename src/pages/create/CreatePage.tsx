import { db } from '../../FirestoreConfig';
import { collection, addDoc } from "firebase/firestore";
import Loading from '../../components/loading/Loading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePage.module.css'; 
import ValidationError from "../../components/validation-error/ValidationError";

function CreatePage() {

  //-------------------------------------------------//
      const navigate = useNavigate();
      
      const [form, setForm] = useState({
        nome: {
        hasChanged: false,
        value: ""
        },
        laboratorio: {
        hasChanged: false,
        value: ""
        },
        substancias: {
        hasChanged: false,
        value: ""
        },
        indicacao: {
        hasChanged: false,
        value: ""
        },
        tarja: {
        hasChanged: false,
        value: ""
        },
        apresentacao: {
        hasChanged: false,
        value: ""
        },
        descricao: {
        hasChanged: false,
        value: ""
        },
        preco: {
        hasChanged: false,
        value: ""
        },     
      })            
        const nome = form.nome.value; 
        const laboratorio = form.laboratorio.value;
        const substancia = form.substancias.value; 
        const indicacao = form.indicacao.value;
        const tarja = form.tarja.value; 
        const apresentacao = form.apresentacao.value;
        const descricao = form.descricao.value; 
        const preco = form.preco.value;

        const [error, setError] = useState(null as any);
        const [showLoading, setShowLoading] = useState(false);
        
    const handleClick = () => {
      
      setShowLoading(true);

      const dadosRef = addDoc(collection(db, "expectorante"), {        
        nome: nome, 
        laboratorio: laboratorio,
        substancia: substancia, 
        indicacao: indicacao,
        tarja: tarja, 
        apresentacao: apresentacao,
        descricao: descricao, 
        preco: preco
      }).then(() => {
        setShowLoading(false)
        alert('Dados Cadastrados com sucesso!');
        navigate('../create');
        
      
       })
       .catch(error => {
        setShowLoading(false)
        setError(error);
       }); 
          console.log(dadosRef)    
          Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
          );            
    };
                 
  return (
    <>
        <body>
            <main className='centralize'>
            <h1>Bem vindo ao PharmaPlain!</h1>
              <div >
                <h2>Adicione um novo produto:</h2>
              </div>
              <form>    
                <div>
                <label htmlFor='nome'>Nome do Medicamento</label><br></br>
                <input className='criador' 
                type='text'
                required
                name='nome'
                placeholder='Entre com o Nome'
                onChange={event => setForm({...form, nome: {
                hasChanged: true, value: event.target.value
                }})}
                /><br></br><br></br>
                <ValidationError
                hasChanged={form.nome.hasChanged}
                errorMessage='Nome é obrigatório'
                testId='nome-required'
                type='required'
                value={form.nome.value}/>
                </div>

                <div>
                <label htmlFor='laboratorio'>Laboratório</label>
                <input className='criador'
                type='text'
                required
                name='laboratorio'
                placeholder='Laboratório'
                onChange={event => setForm({...form, laboratorio: {
                  hasChanged: true, value: event.target.value
                  }})}
                /><br></br><br></br>
                <ValidationError
                hasChanged={form.laboratorio.hasChanged}
                errorMessage='Laboratório é obrigatório'
                testId='labor-required'
                type='required'
                value={form.laboratorio.value}/>
                </div>
                
                <div>
                <label htmlFor='substancias'>Substâncias:</label>
                <input className='criador'
                type='text'
                required
                name="substancias"
                placeholder='Substâncias Utilizadas'
                onChange={event => setForm({...form, substancias: {
                  hasChanged: true, value: event.target.value
                  }})}
                /><br></br><br></br>
                <ValidationError
                hasChanged={form.substancias.hasChanged}
                errorMessage='Substâncias é obrigatório'
                testId='subst-required'
                type='required'
                value={form.substancias.value}/>
                </div>

                <div>
                <label htmlFor='indicacao'>Indicação:</label>
                <input className='criador'
                type='text'
                required
                name='indicacao'
                placeholder='Indicação'
                onChange={event => setForm({...form, indicacao: {
                  hasChanged: true, value: event.target.value
                  }})}
                /><br></br><br></br>
                <ValidationError
                hasChanged={form.indicacao.hasChanged}
                errorMessage='Indicação é obrigatório'
                testId='indicacao-required'
                type='required'
                value={form.indicacao.value}/>
                </div>
                
                <div>
                <label htmlFor='tarja'>Tarja</label>
                <input className='criador'
                type='text'
                required
                name='tarja'
                placeholder='Cor da Tarja'
                onChange={event => setForm({...form, tarja: {
                  hasChanged: true, value: event.target.value
                  }})}
                /><br></br><br></br>
                </div>

                <div>
                <label htmlFor='apresentacao'>Apresentação:</label>
                <input className='criador'
                type='text'
                required
                name='apresentacao'
                placeholder='Apresentação'
                onChange={event => setForm({...form, apresentacao: {
                  hasChanged: true, value: event.target.value
                  }})}
                /><br></br><br></br>
                <ValidationError
                hasChanged={form.apresentacao.hasChanged}
                errorMessage='Apresentação é obrigatório'
                testId='apres-required'
                type='required'
                value={form.apresentacao.value}/>
                </div>
                
                <div>              
                <label htmlFor='descricao'>Descrição:</label>
                <input className='criador'
                type='text'
                required
                name='descricao'
                placeholder='Descrição'
                onChange={event => setForm({...form, descricao: {
                  hasChanged: true, value: event.target.value
                  }})}
                /><br></br><br></br>
                </div>
                
                <div>                            
                <label htmlFor='preco'>Preço médio</label>
                <input className='criador'
                type="text"
                required
                name='preco'
                placeholder='Preço'
                onChange={event => setForm({...form, preco: {
                  hasChanged: true, value: event.target.value
                  }})}
                /><br></br><br></br>
                <ValidationError
                hasChanged={form.preco.hasChanged}
                errorMessage='Preço é obrigatório'
                testId='preco-required'
                type='required'
                value={form.preco.value}/>
                </div>

                <button type='button'
                disabled={!form.nome.value || !form.laboratorio.value || 
                   !form.substancias.value || !form.indicacao.value || 
                  !form.apresentacao.value || !form.preco.value } 
                className='solid'
                onClick={handleClick}
                >
                Enviar
                </button>                   
                </form>
                { showLoading && <Loading /> }               
            </main>         
        </body> 
    </>       
  )     
}
export default CreatePage;