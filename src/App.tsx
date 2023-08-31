import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import RegisterPage from './pages/register/RegisterPage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Loading from './components/loading/Loading';
import { useAuthContext } from './contexts/auth/AuthContext';
import CreatePage from './pages/create/CreatePage';
//Components
import Header from './components/Header';
import Footer from './components/Footer';
import ReadPage from './pages/read/ReadPage';
import DeletePage from './pages/delete/DeletePage';
import UpdatePage from './pages/update/UpdatePage';

function App() {

   const { isLoadingLoggedUser, user } = useAuthContext();

   return (
     <> 
         <div>
            <Header />
            <main>                     
            {  !isLoadingLoggedUser &&
               <BrowserRouter>
                  <Routes>
                     <Route 
                        path='/' 
                        element={
                              !user ? 
                              <LoginPage />
                              : <Navigate to={'/home'} />
                        } 
                     />
                     <Route 
                        path='/login' 
                        element={
                              !user ? 
                              <LoginPage />
                              : <Navigate to={'/home'} />
                        } 
                     />
                     <Route
                        path='/register'
                        element={
                              !user ? 
                              <RegisterPage /> 
                              : <Navigate to={'/home'} />
                        } 
                     />                         
                     <Route 
                        path='/home' 
                        element={
                           user ? <HomePage /> 
                           : <Navigate to={'/'} />
                        } 
                     />
                     <Route 
                        path='/delete' 
                        element={
                           user ? <DeletePage /> 
                           : <Navigate to={'/'} />
                        } 
                     />
                     <Route 
                        path='/update' 
                        element={
                           user ? <UpdatePage /> 
                           : <Navigate to={'/'} />
                        } 
                     />
                     <Route 
                        path='/create' 
                        element={
                           user ? <CreatePage /> 
                           : <Navigate to={'/'} />
                        } 
                     />
                     <Route 
                        path='/read' 
                        element={
                           user ? <ReadPage /> 
                           : <Navigate to={'/'} />
                        } 
                     />                      
                  </Routes>       
               </BrowserRouter>            
            }
            </main>    
            {isLoadingLoggedUser && <Loading />}
            
            <Footer /> 
         </div>                         
     </>     
   )
}

export default App;
