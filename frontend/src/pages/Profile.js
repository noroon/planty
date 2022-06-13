import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { handleChange } from '../utils';
import validateForm from '../utils/validation';
import { updateUser, useAuthDispatch, useAuthState } from '../context';

import {
  Alert,
  Button,
  InputField,
} from '../components/general';

export default function Profile() {
  const dispatch = useAuthDispatch();

  const [userData, setUserData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');

  const user = useAuthState();

  const navigate = useNavigate();

  useEffect(() => {
    setUserData({
      name: user.userDetails.name,
      email: user.userDetails.email,
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm('profileSchema', userData, setAlertMessage)) {
      const { name, email, password } = userData;

      try {
        const response = await updateUser(dispatch, { name, email, password }, user.token);
        if (!response.token) return;
        navigate('/');
      } catch (error) {
        console.log(error);
      }
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
