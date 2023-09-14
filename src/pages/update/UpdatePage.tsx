import {db} from '../../FirestoreConfig'
import Loading from '../../components/loading/Loading';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth/AuthContext';
import AuthService from '../../services/AuthService';


function UpdatePage() {

  // Create an initial document to update.
  const { authService }: { authService: AuthService } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null as any);
  const [showLoading, setShowLoading] = useState(false);


  const updateData = async () => {

    setShowLoading(true);

    // const expectorRef = doc(db, "expectorante", "AMBROL");
    // setDoc(expectorRef, {
    //   name: "AMBROL",
    //   preco: "16.68",
    //   tarja: "PRETA"
    // });
    // console.log(expectorRef)

    // To update age and favorite color:
    // updateDoc(expectorRef, {
    //   "nome": "AMBROL",
    //   "preco": 13.98,
    //   "tarja": "VERMELHA"
    // }).then(response => {
    //   setShowLoading(false)
    //   console.log('Dados Alterados')
    //   alert('Dados Atualizados com sucesso!');
    //   navigate('../update');

    // })
    //   .catch(error => {
    //     setShowLoading(true)
    //     alert(error.code)
    //     setError(error);
    //   });

    // console.log(expectorRef)
    // Array.from(document.querySelectorAll("input")).forEach(
    //   input => (input.value = "")
    // );
  }



  return (
    <>
      <main>
        <h1>Bem vindo ao PharmaPlain!</h1>

      </main>
      {<Loading />}
    </>
  )
}
export default UpdatePage;