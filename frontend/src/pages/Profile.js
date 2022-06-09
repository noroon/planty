import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthState } from '../context';
import { handleChange } from '../utils';
import axios from '../config/axiosConfig';
import { profileSchema } from '../utils/validationSchemas';

import {
  Alert,
  Button,
  InputField,
} from '../components/general';

function Profile() {
  const [userData, setUserData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');

  const user = useAuthState();
  const { name, email } = user.userDetails;

  const navigate = useNavigate();

  useEffect(() => {
    setUserData({ name, email });
  }, []);

  function validateForm() {
    const result = profileSchema.validate(userData);
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
        <legend className="mb-5">Profil szerkesztése</legend>
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
          className="btn-primary mt-2 mb-2 mx-auto"
          value="Frissítés"
        />
      </form>
    </div>
  );
}

export default Profile;
