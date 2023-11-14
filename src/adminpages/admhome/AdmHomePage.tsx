import { HeaderSuperUser } from '../../components/headeruser/HeaderSuperUser';
import './AdmHomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {

  const navigate = useNavigate();
 
  const Consult = () => {
    navigate('../adminpages/admread');
  }

  return (
    
    <div>
      <HeaderSuperUser />
      <main className='centralize'>
        <h1>Bem vindo ao PharmaPlain Controle!</h1>
        <div className='home'>
          <article>
            <h2>Administre as informações dos produtos!</h2>
            <p>
              Sistema de controle de produtos e configuração de usuários. Para configurar usuários você precisa de altorização: Consulte o seu administrador:
            </p>
          </article>
          <button className='consultdata' onClick={Consult}>Consultar</button>
        </div>
      </main>
    </div>
  )
}
export default HomePage;