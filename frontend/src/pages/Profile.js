import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';

import { useAuthState } from '../context';
import { handleChange } from '../utils';
import axios from '../api/axios';
import InputField from '../components/InputField';
import Alert from '../components/Alert';
import Button from '../components/Button';

function Profile() {
  const [userData, setUserData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');

  const user = useAuthState();
  const { name, email } = user.userDetails;

  const navigate = useNavigate();

  useEffect(() => {
    setUserData({ name, email });
  }, []);

  const schema = Joi.object({
    name: Joi.string().messages({
      'any.required': 'A field is required to be filled.',
      'string.empty': 'A field is required to be filled.',
    }),
    password: Joi.string().min(8).messages({
      'any.required': 'A field is required to be filled.',
      'string.empty': 'A field is required to be filled.',
      'string.min': 'Password must be at least 8 characters.',
    }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .messages({
        'string.email': 'Email must be a valid email.',
        'string.empty': 'A field is required to be filled.',
        'any.required': 'A field is required to be filled.',
      }),
    passwordConfirm: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .messages({
        'any.required': 'Password confirmation is required.',
        'string.empty': 'Password confirmation is required.',
        'any.only': "Password and it's confirmation are not same",
      }),
  });

  function validateForm() {
    const result = schema.validate(userData);
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

  const putUser = async () => {
    const authAxios = axios.create({
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    try {
      const { password } = userData;
      const patchData = {
        name,
        email,
        password,
      };
      const res = await authAxios.patch('/users', patchData);
      if (res.data.message) {
        setAlertMessage({
          className: 'alert-danger',
          value: res.data.message,
        });
      } else {
        // const accessToken = res.data.token;
        // setUser(accessToken);
        // localStorage.setItem(
        //   'user',
        //   JSON.stringify(accessToken),
        // );
        setAlertMessage({
          className: 'alert-success',
          value: 'Update sucsessful.',
        });
        setUserData({});
        setAlertMessage('');
        navigate('/');
      }
    } catch (err) {
      setAlertMessage({
        className: 'alert-danger',
        value:
          "Something went wrong. But don't worry, our best people are on it!",
      });
    }
  };

  function handleOnSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      putUser();
    }
  }

  return (
    <div className="container profile-form">
      <form
        onSubmit={handleOnSubmit}
        noValidate
        className="align-middle mx-auto d-flex flex-column justify-content-center"
      >
        <h2 className="mt-3 mb-3">Edit profile</h2>
        {alertMessage.value && (
          <Alert
            className={alertMessage.className}
            value={alertMessage.value}
          />
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
          value="Update"
        />
      </form>
    </div>
  );
}

export default Profile;
