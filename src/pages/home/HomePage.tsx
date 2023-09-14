import './HomePage.module.css';
import AuthService from '../../services/AuthService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth/AuthContext';



function HomePage() {

  const { authService }: { authService: AuthService } = useAuthContext();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setIsLoggingOut(true);
    authService.logout().then(() => {
      setIsLoggingOut(false);
      navigate('/');
    })
  }

  const Consult = () => {
    navigate('../read');
  }

  return (
    <div>
      <header>
      <button className='clear' onClick={logout}>Sair</button>
      </header>      
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