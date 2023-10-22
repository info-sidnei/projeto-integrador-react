import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../FirestoreConfig";
import { useAuthContext } from '../contexts/auth/AuthContext';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { DrawerProvider } from '../contexts';
import Header from "./Header";
import Footer from "./Footer";
import LoginPage from "../pages/login/LoginPage";
import HomePage from "../pages/home/HomePage";
import RegisterPage from "../pages/register/RegisterPage";
import RegisterComplete from "../pages/registercomplete/RegisterComplete";
import ReadPage from "../pages/read/ReadPage";
import QuemSomosPage from "../pages/quemsomos/QuemSomosPage";

import AdmUpdatePage from "../adminpages/admupdate/AdmUpdatePage";
import AdmHomePage from "../adminpages/admhome/AdmHomePage";
import AdmReadPage from "../adminpages/admread/AdmReadPage";
import AdmPerfil from "../adminpages/admperfil/AdmPerfil";
import AdmCreatePage from "../adminpages/admcreate/AdmCreatePage";
import { auth } from "../FirebaseConfig";

const Rotas = () => {           
         
         const { isLoadingLoggedUser, user } = useAuthContext();
         //const [type, setType] = useState<string>('');

    return (
      <div>
        {!isLoadingLoggedUser &&
                  <DrawerProvider>
                     <BrowserRouter>
                        <Header />
                        <Routes>
                           <Route path='/'
                              element={
                                 !user ? <LoginPage />
                                    : <Navigate to={'/home'} />
                              }
                           />
                           <Route path='/login'
                              element={
                                 !user ? <LoginPage />
                                    : <Navigate to={'/home'} />
                              }
                           />
                           {/*<Route path="/home" element={getHomeComponent()} />*/}

                           <Route path='/home'
                              element={
                                 user ? <HomePage />
                                    : <Navigate to={'/'} />
                              }
                           />
                           <Route path='/register'
                              element={
                                 !user ? <RegisterPage />
                                    : <Navigate to={'/home'} />
                              }
                           />
                           <Route path='/registercomplete'
                              element={
                                 user ? <RegisterComplete />
                                    : <Navigate to={'/'} />
                              }
                           />
                           <Route path='/read'
                              element={
                                 user ? <ReadPage />
                                    : <Navigate to={'/'} />
                              }
                           />
                           <Route path='/quemsomos'
                              element={
                                 user ? <QuemSomosPage />
                                    : <Navigate to={'/'} />
                              }
                           />

                           {/*Criar Regra para somente admin*/}
                           <Route path='/adminpages/admhome'
                              element={
                                 user ? <AdmHomePage />
                                    : <Navigate to={'/'} />
                              }
                           />
                           <Route path='/adminpages/admread'
                              element={
                                 user ? <AdmReadPage />
                                    : <Navigate to={'/'} />
                              }
                           />
                           <Route path='/adminpages/admupdate'
                              element={
                                 user ? <AdmUpdatePage />
                                    : <Navigate to={'/'} />
                              }
                           />
                           <Route path='/adminpages/admcreate'
                              element={
                                 user ? <AdmCreatePage />
                                    : <Navigate to={'/'} />
                              }
                           />
                           <Route path='/adminpages/admperfil'
                              element={
                                 user ? <AdmPerfil />
                                    : <Navigate to={'/'} />
                              }
                           />
                           <Route path='*'
                              element={<div className='erro'>Pagina não encontrada</div>
                              }
                           />
                        </Routes>
                        <Footer />
                     </BrowserRouter>
                  </DrawerProvider>
               }
      </div>
    );
}

export default Rotas