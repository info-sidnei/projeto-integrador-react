import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import LoginPage from './LoginPage';
import AuthServiceMock from '../../helpers/mocks/AuthServiceMock';
import AuthProvider from '../../contexts/auth/AuthProvider';
import { auth } from '../../FirebaseConfig'

describe('Login', () => {

      let authService: AuthServiceMock;

      beforeEach(() => {
        authService = new AuthServiceMock();
      })
  
      //(27)
      test('given page starts, then hide recover password success message', () => {
        renderLoginPage();

        expect(screen.queryByTestId('recover-password-success-message'))
          .toBeNull();
      })
  
  describe('given email', () =>  {   
      //(1)
      test('when empty, then show required error message', () => {
        renderLoginPage();

        const email = screen.getByTestId('email');//data-testid

        userEvent.type(email, "anyValue");
        userEvent.clear(email);

        const requiredError = screen.queryByTestId('email-required');//testId
        expect(requiredError).not.toBeNull();
        
      })
      //(2)
      test('when has value, then hide required error message', () => {
        renderLoginPage();

        const email = screen.getByTestId('email');

        userEvent.type(email, "anyValue");
        

        const requiredError = screen.queryByTestId('email-required');
        expect(requiredError).toBeNull();
        
      })
      //(3)
      test('when field not changed, then hide required error message', () => {
        renderLoginPage();   

        const requiredError = screen.queryByTestId('email-required');
        expect(requiredError).toBeNull();
        
      })
      //(4)
      test('when invalid, then show invalid error message', () => {
        renderLoginPage();

        const email = screen.getByTestId('email');

        userEvent.type(email, "anyValue");
        
        const requiredError = screen.queryByTestId('email-invalid');
        expect(requiredError).not.toBeNull();
        
      })
      //(5)
      test('when valid, then hide invalid error message', () => {
        renderLoginPage();

        const email = screen.getByTestId('email');

        userEvent.type(email, "valid@email.com");
        
        const requiredError = screen.queryByTestId('email-invalid');
        expect(requiredError).toBeNull();
        
      })
      //(8)
      test('when empty, then disable recover password button', () => {
        renderLoginPage();

        const recoverPasswordButton = screen.getByTestId('recover-password-button');

        expect(recoverPasswordButton).toBeDisabled();
        
      })
      //(9)
      test('when valid, then enable recover password button', () => {
        renderLoginPage();

        const email = screen.getByTestId('email');
        userEvent.type(email, "valid@email.com");

        const recoverPasswordButton = screen.getByTestId('recover-password-button');

        expect(recoverPasswordButton).not.toBeDisabled();
        
      })
  })
  
  describe('given password', () => {
      //(6)
      test('when empty, then show required error message', () => {
        renderLoginPage();

        const password = screen.getByTestId('password');//data-testid

        userEvent.type(password, "anyValue");
        userEvent.clear(password);

        const requiredError = screen.queryByTestId('password-required');//testId
        expect(requiredError).not.toBeNull();
        
      })
      //(7)
      test('when has value, then hide required error message', () => {
        renderLoginPage();

        const password = screen.getByTestId('password');//data-testid

        userEvent.type(password, "anyValue");
      
        const requiredError = screen.queryByTestId('password-required');//testId
        expect(requiredError).toBeNull();
        
      })

  })
      //(10)
      test('given form invalid, then disable login button', () => {
        renderLoginPage();

        const loginButton = screen.getByTestId('login-button');

        expect(loginButton).toBeDisabled();
        
      })
      //(11)
      test('given form valid, then enable login button', () => {
        renderLoginPage();

        fillFormWithValidValues();

        const loginButton = screen.getByTestId('login-button');

        expect(loginButton).not.toBeDisabled();  
      })
      //(17)
      test('given user clicks on register button, then go to register page', () => {
        renderLoginPage();

        const registerButton = screen.getByTestId('register-button');
        userEvent.click(registerButton);

        expect(window.location.pathname).toEqual('/register');
      })

      //----------------------------------------------------

  describe('given user clicks on login button', () => {
      //(18)
        test('then call login', async() => {
        authService.response = Promise.resolve({} as any);  
        
          renderPageAndTryToLogin();

          await waitFor(() => expect(authService.isLoggingIn).toBeTruthy());
      
        })
      //(19)
      test('when success, then go to home page', async() => {
        authService.response = Promise.resolve({} as any);

          renderPageAndTryToLogin();

          await waitFor(() => expect(window.location.pathname).toEqual('/home'));
      
        })
      //(20)
        test('when fail, then show error message', async() => {
          authService.response = Promise.reject({message: "error"});
          
          renderPageAndTryToLogin();

          expect(await screen.findByTestId('error')).not.toBeNull();
      
        })
      //(21)
        test('then show loading', async() => {
                    
          renderPageAndTryToLogin();
      
          expect(await screen.findByTestId('loading')).not.toBeNull();
        
        })
      //(22)
        test('when success, then hide loading', async() => {
          authService.response = Promise.resolve({} as any);  
        
          renderPageAndTryToLogin();
    
          await waitFor(() => expect(screen.queryByTestId('loading')).toBeNull());
      
        })
      //(23)  
        test('when fail, then hide loading', async() => {
          authService.response = Promise.reject({message: "error"});  
        
          renderPageAndTryToLogin();
    
          await waitFor(() => expect(screen.queryByTestId('loading')).toBeNull());
      
        })

        function renderPageAndTryToLogin() {
          renderLoginPage();
          fillFormWithValidValues();
          clickOnLoginButton();
        }
        
  })
      
  describe('given user clicks on recover password button', () => {
      //(24)
        test('then call recover password', () => {
          
          renderLoginPage();

          const email = screen.getByTestId('email');
          userEvent.type(email, 'valid@email.com');
          const recoverPasswordButton = screen.getByTestId('recover-password-button');
          userEvent.click(recoverPasswordButton);

          expect(authService.isRecoveringPassword).toBeTruthy();
        })    
      //(25)
        test('then show loading', async() => {
          
          renderLoginPage();

          const email = screen.getByTestId('email');
          userEvent.type(email, 'valid@email.com');
          const recoverPasswordButton = screen.getByTestId('recover-password-button');
          userEvent.click(recoverPasswordButton);

          expect(await screen.findByTestId('loading')).not.toBeNull();
        })
        //(26)
        test('when success, then show success message', async() => {
          authService.response = Promise.resolve({});
          renderLoginPage();

          const email = screen.getByTestId('email');
          userEvent.type(email, 'valid@email.com');
          const recoverPasswordButton = screen.getByTestId('recover-password-button');
          userEvent.click(recoverPasswordButton);

          expect(await screen.findByTestId('recover-password-success-message'))
            .not.toBeNull();
        })
        //(28)
        test('when success, then hide loading', async() => {
          authService.response = Promise.resolve({});
          renderLoginPage();

          const email = screen.getByTestId('email');
          userEvent.type(email, 'valid@email.com');
          const recoverPasswordButton = screen.getByTestId('recover-password-button');
          userEvent.click(recoverPasswordButton);

          await waitFor(() => expect(screen.queryByTestId('loading'))
            .toBeNull());
        })
        //(29)
        test('when fail, then show error', async() => {
          authService.response = Promise.reject({message: "error"});
          renderLoginPage();

          const email = screen.getByTestId('email');
          userEvent.type(email, 'valid@email.com');
          const recoverPasswordButton = screen.getByTestId('recover-password-button');
          userEvent.click(recoverPasswordButton);

          expect(await screen.findByTestId('error')).not.toBeNull();
        })
        //(30)
        test('when fail, then hide loading', async() => {
          authService.response = Promise.reject({message: "error"});
          renderLoginPage();

          const email = screen.getByTestId('email');
          userEvent.type(email, 'valid@email.com');
          const recoverPasswordButton = screen.getByTestId('recover-password-button');
          userEvent.click(recoverPasswordButton);

          await waitFor(() => expect(screen.queryByTestId('loading'))
            .toBeNull());
        })
        
  })      
        function renderLoginPage() {
          render(
            <AuthProvider authService={authService as any}>
              <BrowserRouter>
                <Routes location={'/'}>
                  <Route path='/'
                    element={
                      <LoginPage />
                    } />
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          );
        }
        
        function fillFormWithValidValues() {
          const email = screen.getByTestId('email');
          userEvent.type(email, "valid@email.com");

          const password = screen.getByTestId('password');
          userEvent.type(password, "anyValue");
        }

        function clickOnLoginButton() {
          const loginButton = screen.getByTestId('login-button');
          userEvent.click(loginButton);
        }    
});