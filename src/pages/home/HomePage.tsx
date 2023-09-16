import './HomePage.css';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth/AuthContext';



function HomePage() {

  const home = () => { navigate('/home'); }

  const read = () => { navigate('/read'); }

  const create = () => { navigate('/create'); }

  const update = () => { navigate('/update'); }

  const deletar = () => { navigate('/delete'); }

  const { authService }: { authService: AuthService } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => { 
    authService.logout().then(() => {
      navigate('/');
    })
  }

  const Consult = () => {
    navigate('../read');
  }

  return (
    <div>
      <div>
      <div className='menu-container'>
        <button className='clear' onClick={home}>Home</button>
        <button className='clear' onClick={read}>Pesquisar</button>
        <button className='clear' onClick={create}>Cadastrar Produto</button>
        <button className='clear' onClick={update}>Update</button>
        <button className='clear' onClick={deletar}>Deletar</button>
        <button className='clear' onClick={logout}>Sair</button>
      </div>

      </div>      
      <main className='centralize'>      
        <h1>Bem vindo ao PharmaPlain!</h1>
        <div className='home'>
        <article>
          <h2>Adquira aqui informações farmacêuticas!</h2>
          <p>
            Tudo que você procura sobre indicação, laboratório, preço médio e 
            outras curiosidades a respeito de qualquer medicamento disponível 
            no mercado brasileiro.
          </p>
        </article>
        <button className='consultdata' onClick={Consult}>Consultar</button>
        </div>
      </main>
    </div>   
  )
}
export default HomePage;