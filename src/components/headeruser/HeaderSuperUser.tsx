import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { useAuthContext } from '../../contexts/auth/AuthContext';
import './Header2.css'

export const HeaderSuperUser = () => {

  const { authService }: { authService: AuthService } = useAuthContext();

  const navigate = useNavigate();

  const home = () => { navigate('/adminpages/admhome'); }

  const read = () => { navigate('/adminpages/admread'); }

  const create = () => { navigate('/adminpages/admcreate'); }

  const perfil = () => { navigate('/adminpages/admperfil'); }

  const logout = () => {
    authService.logout()
      .then(() => {
        navigate('/');
      })
  }

  return (
    <div className='menu-container'>
      <button className='clear' onClick={home}>Home</button>
      <button className='clear' onClick={read}>Pesquisar</button>
      <button className='clear' onClick={create}>Cadastrar Produtos</button>
      <button className='clear' onClick={perfil}>Alterar Perfil</button>
      <button className='clear' onClick={logout}>Sair</button>
    </div>
  );
};