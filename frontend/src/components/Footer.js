import { useState } from 'react';
import { handleChange } from '../utils';
import { Alert, InputGroup } from './general';

import axios from '../api/axios';
import validateForm from '../utils/validation';

export default function Footer() {
  const [userData, setUserData] = useState('');
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

    if (validateForm('newsletterSchema', userData, setAlertMessage)) {
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
