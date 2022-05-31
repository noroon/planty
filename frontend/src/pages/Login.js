import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { loginUser, useAuthDispatch } from '../context';
import { handleChange } from '../utils';

import InputField from '../components/InputField';
import Alert from '../components/Alert';
import Button from '../components/Button';

export default function Login() {
  const dispatch = useAuthDispatch();
  // const { loading, errorMessage } = useAuthState();

  const [userData, setUserData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    let err = '';

    if (!userData.email || !userData.password) {
      err = 'All fields are required.';
      setAlertMessage(err);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validate();

    if (isValid) {
      const { email, password } = userData;

      try {
        const response = await loginUser(dispatch, { email, password });
        if (!response.token) return;
        navigate('/');
      } catch (error) {
        console.log(error);
      }

      setUserData({});
      setAlertMessage('');
    }
  };

  return (
    <div className="container login-form">
      {alertMessage && <Alert className="alert-danger" value={alertMessage} />}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="align-middle mx-auto d-flex flex-column justify-content-center"
      >
        <InputField
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => handleChange(e, userData, setUserData)}
          iconClass="bi bi-envelope"
        />
        <InputField
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => handleChange(e, userData, setUserData)}
          iconClass="bi bi-asterisk"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          className="btn-primary mt-2 mb-2 mx-auto"
          value="Login"
        />
        <Link to="/register" className="text-center">
          If you dont have an account, click here to register
        </Link>
      </form>
    </div>
  );
}
