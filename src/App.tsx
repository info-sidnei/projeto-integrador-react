import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import RegisterPage from './pages/register/RegisterPage';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Loading from './components/loading/Loading';
import { useAuthContext } from './contexts/auth/AuthContext';
import Rotas from './components/Rotas';
import Header from './components/Header';
import Footer from './components/Footer';
import ReadPage from './pages/read/ReadPage';
import RegisterComplete from './pages/registercomplete/RegisterComplete';
import { ITask } from './interfaces/Task';
import QuemSomosPage from './pages/quemsomos/QuemSomosPage';
import VLibras from '@djpfs/react-vlibras';


import AdmHomePages from './adminpages/admhome/AdmHomePage'
import AdmReadPage from './adminpages/admread/AdmReadPage'
import AdmCreatePage from './adminpages/admcreate/AdmCreatePage';
import AdmUpdatePage from './adminpages/admupdate/AdmUpdatePage';
import AdmPerfil from './adminpages/admperfil/AdmPerfil'
import { DrawerProvider } from './contexts';
import React, { useState } from 'react';

import { auth } from './FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './FirestoreConfig';
import  findUser  from './pages/login/LoginPage';


function App() {

   const [taskList, setTaskList] = useState<ITask[]>([])
   const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);
   const { isLoadingLoggedUser, user } = useAuthContext();

   function getHomeComponent() {
      if (user && { type: "Admin" }) {
         return <AdmHomePages />;
      } else if (user && { type: "notAdmin" }) {
         return <HomePage />;
      } else {
         return <LoginPage />;
      }
   }

   return (
      <>
         <div>
            <VLibras forceOnload={true} />
            <main>
              <Rotas />
            </main>
            {isLoadingLoggedUser && <Loading />}
         </div>
      </>
   )
}

export default App;
