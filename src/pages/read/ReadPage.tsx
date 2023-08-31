import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { useAuthContext } from '../../contexts/auth/AuthContext';
import AuthService from '../../services/AuthService';


function ReadPage() {

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

  return (
    <>
      <body>
        <header>
        <button className='clear' onClick={logout}>Sair</button>
        </header>
        <main className='centralize'>
          <h1>PharmaPlain, informação a um Clique.</h1>
          <div >
            <h2>Escolha o método de pesquisa:</h2>
          </div>
          < TaskForm consultDados='Pesquisar' />

          <div>
            <h2>Resultado da Pesquisa</h2>            
          </div>
          <TaskList />
        </main>
      </body>
    </>
  )
}
export default ReadPage;