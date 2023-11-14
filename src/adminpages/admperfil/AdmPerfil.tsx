import './AdmPerfil.css';
import { db } from '../../FirestoreConfig';
import { setDoc, doc } from "firebase/firestore";
import { isAgeValid } from '../../helpers/AgeHelper';
import Loading from "../../components/loading/Loading";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ValidationError from '../../components/validation-error/ValidationError';
import { auth } from '../../FirebaseConfig';
import { HeaderSuperUser } from '../../components/headeruser/HeaderSuperUser';
import { useAuthContext } from '../../contexts/auth/AuthContext';

function RegisterComplete() {

  const [error, setError] = useState(null as any);
  const [showLoading, setShowLoading] = useState(false);
  const { isLoadingLoggedUser, user } = useAuthContext();

  const [form, setForm] = useState({
    firstname: { hasChanged: false, value: "" },
    lastname: { hasChanged: false, value: "" },
    age: { hasChanged: false, value: "" },
  });

  const firstname = form.firstname.value;
  const lastname = form.lastname.value;
  const age = parseInt(form.age.value);
  const isAdmin = false;
  const uid = auth.currentUser.uid

  const regComplete = async () => {

    setShowLoading(true);

    const regRef = await setDoc(doc(db, 'users', uid), {
      firstname: firstname,
      lastname: lastname,
      age: age,
      isAdmin: isAdmin,
      user: {
        uid: uid
      }
    }).then(() => {
      setShowLoading(false)
      alert('Dados Enviados com sucesso!');
      navigate('../home');

    }).catch(error => {
      setShowLoading(false)
      setError(error);
    });
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    console.log(regRef);
  };

  tokenUser();
  function tokenUser() {
    if (user) {
      user.getIdToken().then((token: any) => console.log(token));
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <HeaderSuperUser />
      <main className='centralize'>
        <form className='perfil'>
          <div>
            <h1>PharmaPlain Registro</h1>
          </div>
          <div>
            <h4>Complete seu registro:</h4>
          </div>

          {/*-----------------------------------------*/}
          <div>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Digite seu nome"
              onChange={event => setForm({
                ...form, firstname: {
                  hasChanged: true, value: event.target.value
                }
              })}
            />
            <ValidationError
              hasChanged={form.firstname.hasChanged}
              errorMessage='Nome é obrigatòrio'
              testId='firstname-required'
              type='required'
              value={form.firstname.value} />
            {/*-----------------------------------------*/}
          </div>
          <div>
            <input
              type="text"
              placeholder='Digite seu Sobrenome'
              value={form.lastname.value}
              onChange={event => setForm({
                ...form, lastname: {
                  hasChanged: true, value: event.target.value
                }
              })}
            />
            <ValidationError
              hasChanged={form.lastname.hasChanged}
              errorMessage='Sobrenome é obrigatório'
              testId='lastname-required'
              type='required'
              value={form.lastname.value} />
          </div>
          <div>
            <input
              type="number"
              name='age'
              id='age'
              placeholder='Digite sua idade'
              onChange={event => setForm({
                ...form, age: {
                  hasChanged: true, value: event.target.value,
                }
              })}
            />
            <ValidationError
              hasChanged={form.age.hasChanged}
              errorMessage='Idade é obrigatório'
              testId='age-required'
              type='required'
              value={form.age.value}
            />
            <ValidationError
              errorMessage="Idade deve ser maior que 10"
              hasChanged={form.age.hasChanged}
              testId="age-invalid"
              type="age"
              value={form.age.value}
            />
          </div>

          {error && <div className='error' data-testid="error">{error.message}</div>}

          {/*-----------------------------------------*/}
          <div>
            <button type="button" className='solid'
              data-testid="register"
              disabled={!form.firstname.value || !form.lastname.value || !isAgeValid(form.age.value)}
              onClick={regComplete}>
              Enviar
            </button>
          </div>
          {/*-----------------------------------------*/}
        </form>
        {showLoading && <Loading />}
      </main>
    </div>
  );
}

export default RegisterComplete;