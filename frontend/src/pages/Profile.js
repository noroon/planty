import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthState } from '../context';
import { handleChange } from '../utils';
import axios from '../config/axiosConfig';
import validateForm from '../utils/validation';

import {
  Alert,
  Button,
  InputField,
} from '../components/general';

export default function Profile() {
  const [userData, setUserData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');

  const user = useAuthState();
  const { name, email } = user.userDetails;

  const navigate = useNavigate();

  useEffect(() => {
    setUserData({ name, email });
  }, []);

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
        setAlertMessage(res.data.message);
      } else {
        // const accessToken = res.data.token;
        // setUser(accessToken);
        // localStorage.setItem(
        //   'user',
        //   JSON.stringify(accessToken),
        // );
        setUserData({});
        setAlertMessage('');
        navigate('/');
      }
    } catch (err) {
      setAlertMessage('Something went wrong');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm('profileSchema', userData, setAlertMessage)) {
      putUser();
    }
  };

  return (
    <div className="container profile-form">
      <form onSubmit={handleSubmit} noValidate>
        <legend className="mb-5">Profil szerkesztése</legend>
        {alertMessage && (<Alert className="alert-danger" value={alertMessage} />)}
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
        <Button type="submit" className="btn-primary" value="Frissítés" />
      </form>
    </div>
  );
}
