import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../FirestoreConfig";
import { useAuthContext } from '../contexts/auth/AuthContext';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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
import AuthService from "../services/AuthService";
import NotPermission from "./NotPermission";

const Rotas = () => {

   const { isLoadingLoggedUser, user } = useAuthContext();
   const { authService }: { authService: AuthService } = useAuthContext();
   const [Admin, notAdmin] = useState(true);

   const Logged = async () => {
      if (!authService.getLoggedUser()) {
         <Navigate to={'../pages/login'} />
      } else if (await authService.getLoggedUser()) {
         const uid: string = auth.currentUser.uid
         findUser(uid)
      }
   }
   Logged();

   const findUser = async (uid: string) => {
      if (uid) {
         const querySnapshot = await getDocs(query(collection(db, 'users'), where('user.uid', '==', uid)));
         const transactions = querySnapshot.docs.map((doc) => (doc.data()));

         transactions.forEach((transaction) => {
            const type = transaction.type;
            getHomeComponent(type)
         })
      } else {
         alert('Não há um uid disponível')
      }
   }

   const getHomeComponent = async (type: any) => {
      if (await user && type === "Admin") {
         console.log(type)
         notAdmin(true)
      } else if (await user && !type) {
         notAdmin(false)
      } else if (await user && type !== "Admin") {
         notAdmin(false)
      }
   }


   return (
      <div>
         {!isLoadingLoggedUser &&
            <DrawerProvider>
               <BrowserRouter>
                  <Header />
                  <Routes>

                     <Route path='/' element={user && Admin ? <AdmHomePage /> : user && !Admin ? <HomePage /> : <LoginPage />} />
                     <Route path='/login' element={user && Admin ? <AdmHomePage /> : user && !Admin ? <HomePage /> : <LoginPage />} />
                     <Route path='/home' element={user && Admin ? <AdmHomePage /> : user && !Admin ? <HomePage /> : <Navigate to={'/'} />} />
                     <Route path='/register' element={user && Admin ? <AdmHomePage /> : user && !Admin ? <HomePage /> : <RegisterPage />} />
                     <Route path='/registercomplete' element={user && Admin ? <AdmPerfil /> : user && !Admin ? <RegisterComplete /> : <Navigate to={'/'} />} />
                     <Route path='/read' element={user && Admin ? <AdmReadPage /> : user && !Admin ? <ReadPage /> : <Navigate to={'/'} />} />
                     <Route path='/quemsomos' element={user ? <QuemSomosPage /> : <Navigate to={'/'} />} />

                     {/*Criar Regras para somente admin*/}
                     <Route path='/adminpages/admhome'
                        element={user && !Admin ? <NotPermission /> : user && Admin ? <AdmHomePage /> : <Navigate to={'/'} />} />
                     <Route path='/adminpages/admread'
                        element={user && !Admin ? <NotPermission /> : user && Admin ? <AdmReadPage /> : <Navigate to={'/'} />} />
                     <Route path='/adminpages/admupdate'
                        element={user && !Admin ? <NotPermission /> : user && Admin ? <AdmUpdatePage /> : <Navigate to={'/'} />} />
                     <Route path='/adminpages/admcreate'
                        element={user && !Admin ? <NotPermission /> : user && Admin ? <AdmCreatePage /> : <Navigate to={'/'} />} />
                     <Route path='/adminpages/admperfil'
                        element={user && !Admin ? <NotPermission /> : user && Admin ? <AdmPerfil /> : <Navigate to={'/'} />} />
                     <Route path='*'
                        element={<div className='erro'>Pagina não encontrada</div>} />

                  </Routes>
                  <Footer />
               </BrowserRouter>
            </DrawerProvider>
         }
      </div>
   );
}

export default Rotas