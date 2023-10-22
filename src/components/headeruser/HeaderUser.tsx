import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { useAuthContext } from '../../contexts/auth/AuthContext';
import './Header2.css'

export const HeaderUser = () => {
    
  const { authService }: { authService: AuthService } = useAuthContext();

  const navigate = useNavigate();

  const home = () => { navigate('/home'); }

  const read = () => { navigate('/read'); }

  const perfil = () => { navigate('/registercomplete'); }

  const nos = () => { navigate('/quemsomos'); }

  const logout = () => {
    authService.logout()
    .then(() => {
      navigate('/');
    })
  }

    return (      
        <div className='menu-container'>
          <button className='clear' onClick={home}>Início</button>
          <button className='clear' onClick={read}>Pesquisar</button>
          <button className='clear' onClick={perfil}>Alterar Perfil</button>
          <button className='clear' onClick={nos}>Quem Somos</button>
          <button className='clear' onClick={logout}>Sair</button>
        </div>        
    );
};