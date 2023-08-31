import { isEmailValid } from './../../helpers/EmailHelper';
import Loading from '../../components/loading/Loading';
import { useState } from 'react';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth/AuthContext';
import ValidationError from './../../components/validation-error/ValidationError';
import './LoginPage.css';




function LoginPage() {

  const { authService }: { authService: AuthService } = useAuthContext();
  const [form, setForm] = useState({
    email: {
      hasChanged: false,
      value: ""
    },
    password: {
      hasChanged: false,
      value: ""
    },
  })

  const [error, setError] = useState(null as any);
  const [showLoading, setShowLoading] = useState(false);
  const [showRecoverPasswordMessage, setShowRecoverPasswordMessage] = useState(false);

  const login = () => {
    setShowLoading(true);
    authService.login(
      form.email.value, form.password.value
    )
      .then(() => {
        setShowLoading(false)
        navigate('/home');
      })
      .catch(error => {
        setShowLoading(false);        
        setError(error);
        alert('Email ou senha Inválidos!');
      });
  }

  const recoverPassword = () => {
    setShowLoading(true);
    authService.recoverPassword(
      form.email.value
    ).then(() => {
      setShowRecoverPasswordMessage(true);
      setShowLoading(false);
    }).catch(error => {
      setError(error);
      setShowLoading(false);
    })
  }

  const navigate = useNavigate();
  const goToRegisterPage = () => {
    navigate('/register');
  }

  return (
    <main className='centralize'>
      <div className='cadastro'>
        <h4>Entre com seus dados abaixo:</h4>
      </div>
      <form>
        {/*-----------------------------------------*/}
        <div>
          <input
            type="email"
            placeholder='Email'
            value={form.email.value}
            onChange={event => setForm({
              ...form, email: {
                hasChanged: true, value: event.target.value
              }
            })}
            data-testid="email" />

          <ValidationError
            hasChanged={form.email.hasChanged}
            errorMessage='Email é obrigatòrio'
            testId='email-required'
            type='required'
            value={form.email.value} />

          <ValidationError
            hasChanged={form.email.hasChanged}
            errorMessage='Email é inválido'
            testId='email-invalid'
            type='email'
            value={form.email.value} />
        </div>

        {/*-----------------------------------------*/}
        <div>
          <input
            type="password"
            placeholder='Senha'
            value={form.password.value}
            onChange={event => setForm({
              ...form, password: {
                hasChanged: true, value: event.target.value
              }
            })}
            data-testid="password" />

          <ValidationError
            hasChanged={form.password.hasChanged}
            errorMessage='Senha é obrigatória'
            testId='password-required'
            type='required'
            value={form.password.value} />
        </div>

        {error && <div className='error' data-testid="error">{error.message}</div>}

        {/*-----------------------------------------*/}
        <button type="button" className='solid'
          data-testid="login-button"
          disabled={!isEmailValid(form.email.value) || !form.password.value}
          onClick={login}>
          Entrar
        </button>
        {/*-----------------------------------------*/}

        <button
          type="button"
          className='outline'
          data-testid="register-button"
          onClick={goToRegisterPage}>
          Registrar
        </button>

        {/*-----------------------------------------*/}
        <button
          type="button"
          className='clear'
          data-testid="recover-password-button"
          disabled={!isEmailValid(form.email.value)}
          onClick={recoverPassword}>
          Recuperar senha
        </button>

      </form>
      {showLoading && <Loading />}
      {showRecoverPasswordMessage &&
        <div data-testid="recover-password-success-message">
          Verifique sua caixa de email
        </div>
      }
    </main>
  );
}

export default LoginPage;
