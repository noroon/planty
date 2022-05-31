import {
  render, screen, fireEvent, act,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import Register from '.';
import * as Utils from './registerUtils';

fetchMock.enableMocks();

describe('COMPONENT TEST - Register Component', () => {
  const {
    getByPlaceholderText, getByRole, getByText, findByText,
  } = screen;
  const { change, click } = fireEvent;

  beforeEach(() => {
    fetch.resetMocks();
    render(<Register />, { wrapper: BrowserRouter });
  });

  describe('When the page is loaded', () => {
    it('Renders the name field', () => {
      expect(getByPlaceholderText('Username')).toBeInTheDocument();
    });

    it('Renders the email field', () => {
      expect(getByPlaceholderText('Email')).toBeInTheDocument();
    });

    it('Renders the password field', () => {
      expect(getByPlaceholderText('Password')).toBeInTheDocument();
    });

    it('Renders the password confirmation field', () => {
      expect(getByPlaceholderText('Re-enter your password')).toBeInTheDocument();
    });

    it('Renders the register button', () => {
      expect(getByText('Register')).toBeInTheDocument();
    });

    it('Renders the login link', () => {
      const link = getByRole('link', {
        name: 'If you already have an account, click here to login',
      });
      expect(link).toBeInTheDocument();
    });
  });

  describe('When the login link is clicked', () => {
    it('Navigates to the "/login" page', async () => {
      click(getByRole('link', {
        name: 'If you already have an account, click here to login',
      }));
      expect(window.location.pathname).toEqual('/login');
    });
  });

  describe('When the submit button is clicked', () => {
    describe('When some of the fields are empty', () => {
      it('Gives an alert message, when name is empty', async () => {
        click(getByRole('button'));
        expect(getByText('Name, email and password are required.'))
          .toBeInTheDocument();
      });

      it('Gives an alert message, when email is empty', async () => {
        act(() => {
          change(getByPlaceholderText('Username'), { target: { value: 'dummy username' } });
          click(getByRole('button'));
        });

        expect(getByText('Name, email and password are required.'))
          .toBeInTheDocument();
      });

      it('Gives an alert message, when password is empty', async () => {
        change(getByPlaceholderText('Username'), { target: { value: 'dummy username' } });
        change(getByPlaceholderText('Email'), { target: { value: 'dummy@dummy.com' } });
        click(getByRole('button'));
        expect(getByText('Name, email and password are required.'))
          .toBeInTheDocument();
      });

      it('Gives an alert message, when password length < 8', async () => {
        change(getByPlaceholderText('Username'), { target: { value: 'dummy username' } });
        change(getByPlaceholderText('Email'), { target: { value: 'dummy@dummy.com' } });
        change(getByPlaceholderText('Password'), { target: { value: '12345' } });
        click(getByRole('button'));
        expect(getByText('Password must be at least 8 characters.'))
          .toBeInTheDocument();
      });

      it('Gives an alert message, when password and it\'s confirmation are not same', async () => {
        change(getByPlaceholderText('Username'), { target: { value: 'dummy username' } });
        change(getByPlaceholderText('Email'), { target: { value: 'dummy@dummy.com' } });
        change(getByPlaceholderText('Password'), { target: { value: '12345678' } });
        change(getByPlaceholderText('Re-enter your password'), { target: { value: '123456789' } });
        click(getByRole('button'));
        expect(getByText('Password and it\'s confirmation are not same'))
          .toBeInTheDocument();
      });
    });

    describe('When all inputfields are valid', () => {
      it('Show error message what comes from backend', async () => {
        fetch.mockResponseOnce(JSON.stringify({ message: 'errorMsg' }));

        change(getByPlaceholderText('Username'), { target: { value: 'dummy username' } });
        change(getByPlaceholderText('Email'), { target: { value: 'dummy@dummy.com' } });
        change(getByPlaceholderText('Password'), { target: { value: '12345678' } });
        change(getByPlaceholderText('Re-enter your password'), { target: { value: '12345678' } });
        click(getByText('Register'));

        expect(await findByText('errorMsg')).toBeInTheDocument();
      });

      it("Show error message when the backend isn't available", async () => {
        fetch.mockReject(() => Promise.reject());

        change(getByPlaceholderText('Username'), { target: { value: 'dummy username' } });
        change(getByPlaceholderText('Email'), { target: { value: 'dummy@dummy.com' } });
        change(getByPlaceholderText('Password'), { target: { value: '12345678' } });
        change(getByPlaceholderText('Re-enter your password'), { target: { value: '12345678' } });
        click(getByText('Register'));

        expect(await findByText(
          'Something went wrong. But don\'t worry, our best people are on it!',
        ))
          .toBeInTheDocument();
      });

      it('Show success message when the registering is succeed', async () => {
        const userData = {
          id: 12,
          name: 'dummy username',
          email: 'dummy@dummy.com',
          password: 'dummyPassword',
        };

        fetch.mockResponseOnce(JSON.stringify(userData));
        const mock = jest.spyOn(Utils, 'redirectTimer').mockResolvedValue();

        change(getByPlaceholderText('Username'), { target: { value: 'dummy username' } });
        change(getByPlaceholderText('Email'), { target: { value: 'dummy@dummy.com' } });
        change(getByPlaceholderText('Password'), { target: { value: '12345678' } });
        change(getByPlaceholderText('Re-enter your password'), { target: { value: '12345678' } });
        click(getByText('Register'));

        expect(await findByText('Registration successful.')).toBeInTheDocument();
        mock.mockRestore();
      });

      it('Redirect when the registering is succeed', async () => {
        const userData = {
          id: 12,
          name: 'dummy username',
          email: 'dummy@dummy.com',
          password: 'dummyPassword',
        };

        fetch.mockResponseOnce(JSON.stringify(userData));
        change(getByPlaceholderText('Username'), { target: { value: 'dummy username' } });
        change(getByPlaceholderText('Email'), { target: { value: 'dummy@dummy.com' } });
        change(getByPlaceholderText('Password'), { target: { value: '12345678' } });
        change(getByPlaceholderText('Re-enter your password'), { target: { value: '12345678' } });
        await act(() => click(getByText('Register')));

        expect(window.location.pathname).toEqual('/login');
      });
    });
  });
});
