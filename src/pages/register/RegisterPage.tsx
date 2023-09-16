import './RegisterPage.css';
import { isEmailValid } from './../../helpers/EmailHelper';
import Loading from "../../components/loading/Loading";
import { useState } from 'react';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth/AuthContext';
import ValidationError from './../../components/validation-error/ValidationError';

function RegisterPage() {
    const {authService}: {authService: AuthService} = useAuthContext();

    const [form, setForm] = useState({
        email: {
        hasChanged: false,
        value: ""
        },
        password: {
        hasChanged: false,
        value: ""
        }
    });


    const [error, setError] = useState(null as any);
    const [showLoading, setShowLoading] = useState(false);

    
    const register = () => {
        setShowLoading(true);
        authService.register(
         form.email.value, form.password.value
        )
        .then(() => {
         setShowLoading(false)
         alert("O usuário foi criado com sucesso!")
         navigate('/');
        })
        .catch(error => {
         setShowLoading(false)
         setError(error);
         alert('Email já Cadastrado!')
        });
     }

    const navigate = useNavigate(); 
        

        const linklogin = () => {
            navigate('/');
        } 

  return (
    <main className='centralize'>
      <form>
            <div className='cadastro'>
              <h4>Cadastre seus dados abaixo:</h4>
            </div>

            {/*-----------------------------------------*/}  
            <input
            className='register'
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={event => setForm({...form, email: {
            hasChanged: true, value: event.target.value
            }})}
            data-testid="email" />

            <ValidationError
            hasChanged={form.email.hasChanged}
            errorMessage='Email é obrigatòrio'
            testId='email-required'
            type='required'
            value={form.email.value}/>

            <ValidationError
            hasChanged={form.email.hasChanged}
            errorMessage='Email é inválido'
            testId='email-invalid'
            type='email'
            value={form.email.value}/>

            {/*-----------------------------------------*/}        
            <input
            className='register' 
            type="password" 
            placeholder='Senha' 
            value={form.password.value}
            onChange={event => setForm({...form, password: {
            hasChanged: true, value: event.target.value
            }})}
            data-testid="password" />

            <ValidationError
            hasChanged={form.password.hasChanged}
            errorMessage='Senha é obrigatória'
            testId='password-required'
            type='required'
            value={form.password.value}/>

            {error && <div className='error' data-testid="error">{error.message}</div>}

            {/*-----------------------------------------*/}
            <button type="button" className='solid' 
            data-testid="register"
            disabled={!isEmailValid(form.email.value) || !form.password.value}
            onClick={register}>
            Cadastrar
            </button>
            
            <div className='cadastro'>
                Já tem uma conta?
            </div>
            
            {/*-----------------------------------------*/}
            <button 
            type="button" 
            className='clear' 
            onClick ={linklogin}>  
                Fazer Login
            </button>

      </form>
      { showLoading && <Loading /> }              
    </main>
  );
}
        
export default RegisterPage;