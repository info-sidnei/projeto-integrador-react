import { HeaderUser } from '../../components/headeruser/HeaderUser';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import VLibras from '@djpfs/react-vlibras';

function HomePage() {

  const navigate = useNavigate();

  const Consult = () => {
    navigate('../read')
  }  

  return (
    <div>
      <HeaderUser />
      <main className='centralize'>
        <h1>Bem vindo ao PharmaPlain!</h1>
        <div><h2>Adquira aqui informações farmacêuticas!</h2></div>
        <div className='home'>
          <article>            
            <p>
              Tudo que você procura sobre indicação, laboratório, preço médio e
              outras curiosidades a respeito de qualquer medicamento disponível
              no mercado brasileiro.
            </p>
          </article>
        </div>
        <div>
          <button className='consultdata' onClick={Consult}>Consultar</button>
        </div>
      </main>
      <div>
      <VLibras />
      </div>
    </div>
  )
}
export default HomePage;