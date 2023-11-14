import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import RegisterPage from './pages/register/RegisterPage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Loading from './components/loading/Loading';
import { useAuthContext } from './contexts/auth/AuthContext';
import CreatePage from './pages/create/CreatePage';
import Header from './components/Header';
import Footer from './components/Footer';
import ReadPage from './pages/read/ReadPage';
import DeletePage from './pages/delete/DeletePage';
import UpdatePage from './pages/update/UpdatePage';
import { DrawerProvider } from './contexts';




function App() {
   const { isLoadingLoggedUser, user } = useAuthContext();

   return (
      <>
         <div>
            <main>
               <Rotas />
            </main>
            {isLoadingLoggedUser && <Loading />}
         </div>
      </>
   )
}

export default App;
