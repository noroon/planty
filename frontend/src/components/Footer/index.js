import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import axios from '../../api/axios';
import { Alert, InputGroup } from '../common';
import { handleChange } from '../../utils';
import validateForm, { newsletterSchema } from '../../utils/validation';
import './index.scss';

export default function Footer() {
  const [userData, setUserData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const postRequest = async () => {
    const { email } = userData;

    try {
      const res = await axios.post(
        '/newsletter',
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return res.status;
    } catch (err) {
      return err;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm(newsletterSchema, userData, setAlertMessage);

    if (isValid) {
      postRequest()
        .then((status) => {
          if (status === 200) {
            setSuccessMessage(
              'Köszönjük, sikeresen feliratkoztál hírlevelünkre'
            );
          }
        })
        .catch((err) => {
          setAlertMessage(err.message);
        });
      setUserData('');
      setAlertMessage('');
      setSuccessMessage('');
    }
  };

  return (
    <div id="footer-positioner">
      <Outlet />

      <div className="footer d-flex justify-content-center w-100">
        <form onSubmit={handleSubmit} noValidate>
          <p className="mb-4">
            Ha szeretnél értesülni mindenféle növényes dologról, iratkozz fel
            hírlevelünkre!
          </p>
          {alertMessage && (
            <Alert className="alert-danger" value={alertMessage} />
          )}
          {successMessage && (
            <Alert className="alert-success" value={successMessage} />
          )}
          <InputGroup
            name="email"
            id="subscriber-email"
            value={userData.email}
            placeholder="email címed"
            onChange={(e) => handleChange(e, userData, setUserData)}
            buttonText="Feliratkozom"
          />
        </form>
      </div>
    </div>
  );
}
