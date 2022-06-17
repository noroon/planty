import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { loginUser, useAuthDispatch } from '../context';
import { handleChange } from '../utils';
import validateForm, { loginSchema } from '../utils/validation';

import {
  Alert,
  Button,
  InputField,
} from '../components/general';

export default function Login() {
  const dispatch = useAuthDispatch();

  const [userData, setUserData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm(loginSchema, userData, setAlertMessage);

    if (isValid) {
      const { email, password } = userData;

      try {
        const response = await loginUser(dispatch, { email, password });
        if (!response.token) return;
        navigate('/');
      } catch (err) {
        setAlertMessage(err.message);
      }

      setUserData({});
      setAlertMessage('');
    }
  };

  return (
    <div className="container login-form">
      <form
        onSubmit={handleSubmit}
        noValidate
      >
        <legend className="mb-5">Bejelentkezés</legend>
        {alertMessage && <Alert className="alert-danger" value={alertMessage} />}
        <InputField
          type="text"
          name="email"
          id="email"
          placeholder="email-cím"
          value={userData.email}
          onChange={(e) => handleChange(e, userData, setUserData)}
        />
        <InputField
          type="password"
          name="password"
          id="password"
          placeholder="jelszó"
          value={userData.password}
          onChange={(e) => handleChange(e, userData, setUserData)}
          autoComplete="current-password"
        />
        <Button
          type="submit"
          className="btn-primary"
          value="Bejelentkezés"
        />
        <div className="text-center card-info">
          Ha még nem regisztráltál,
          <Link to="/register">kattints ide!</Link>
        </div>
      </form>
    </div>
  );
}
