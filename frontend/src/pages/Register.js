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
      setAlertMessage(error.message);
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
        <legend className="mb-5">Regisztráció</legend>
        {alertMessage && (
          <Alert className="alert-danger" value={alertMessage} />
        )}
        <InputField
          type="text"
          name="name"
          id="name"
          placeholder="felhasználónév"
          value={userData.name}
          onChange={(e) => handleChange(e, userData, setUserData)}
        />
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
        />
        <InputField
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          placeholder="jelszó újra"
          value={userData.passwordConfirm}
          onChange={(e) => handleChange(e, userData, setUserData)}
        />
        <Button
          type="submit"
          className="btn-primary"
          value="Regisztrálok!"
        />
      </form>
      <div className="text-center card-info">
        Ha rendelkezel regisztrációval,
        <Link to="/login">kattints ide!</Link>
      </div>
    </div>
  );
}

export default Register;
