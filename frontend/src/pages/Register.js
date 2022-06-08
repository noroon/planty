import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { registerSchema } from '../utils/validationSchemas';
import { handleChange } from '../utils';

import {
  Alert,
  Button,
  InputField,
} from '../components/general';

function Register() {
  const [userData, setUserData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  function validateForm() {
    const result = registerSchema.validate(userData);
    const { error } = result;
    if (error) {
      setAlertMessage({
        className: 'alert-danger',
        value: result.error.message,
      });
      return false;
    }
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      const { name, email, password } = userData;

      const options = {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(`${process.env.REACT_APP_API_SERVER}/register`, options)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.message) {
            setAlertMessage(data.message);
          } else {
            navigate('/login');
          }
        })
        .catch(() => {
          setAlertMessage(
            "Something went wrong. But don't worry, our best people are on it!",
          );
        });
    }
  }

  return (
    <div className="container register-form">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="align-middle mx-auto d-flex flex-column justify-content-center"
      >
        <h2 className="mt-3 mb-3">Registration</h2>
        {alertMessage && (
          <Alert className="alert-danger" value={alertMessage} />
        )}
        <InputField
          type="text"
          name="name"
          id="name"
          placeholder="Username"
          value={userData.name}
          onChange={(e) => handleChange(e, userData, setUserData)}
          iconClass="bi bi-person-fill"
        />
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
        />
        <InputField
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          placeholder="Re-enter your password"
          value={userData.passwordConfirm}
          onChange={(e) => handleChange(e, userData, setUserData)}
          iconClass="bi bi-asterisk"
        />
        <Button
          type="submit"
          className="btn-primary mt-2 mb-2 mx-auto"
          value="Regisztrálok!"
        />
      </form>
      <Link to="/login" className="text-center">
        If you already have an account, click here to login
      </Link>
    </div>
  );
}

export default Register;
