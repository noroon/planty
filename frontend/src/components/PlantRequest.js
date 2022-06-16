import { useState } from 'react';
import { handleChange } from '../utils';
import { Alert, InputGroup } from './general';
import { useAuthState } from '../context';

import './PlantRequest.scss';
import axios from '../api/axios';
import validateForm from '../utils/validation';

export default function PlantRequest() {
  const user = useAuthState();

  const [plant, setPlant] = useState({ name: '' });
  const [alertMessage, setAlertMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const postRequest = async () => {
    const { name } = plant;

    try {
      const res = await axios.post(
        '/plant-request',
        { name },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
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

    const isValid = validateForm('requestSchema', plant, setAlertMessage);

    if (isValid) {
      postRequest()
        .then((status) => {
          if (status === 200) setSuccessMessage('A kérést elküldtük');
        })
        .catch((err) => {
          setAlertMessage(err.message);
        });
      setPlant('');
      setAlertMessage('');
      setSuccessMessage('');
    }
  };

  return (
    <div className="request-form d-flex justify-content-center w-100">
      <form onSubmit={handleSubmit} noValidate>
        <legend className="mb-2">Nem találod, amit keresel?</legend>
        <p className="mb-4">
          Küldd el nekünk a keresett növény nevét
          <br />
          és igyekszünk mihamarabb feltölteni
        </p>
        {alertMessage && (
          <Alert className="alert-danger" value={alertMessage} />
        )}
        {successMessage && (
          <Alert className="alert-success" value={successMessage} />
        )}
        <InputGroup
          name="name"
          id="name"
          value={plant.name}
          placeholder="növény neve"
          onChange={(e) => handleChange(e, plant, setPlant)}
          buttonText="Kérés küldése"
        />
      </form>
    </div>
  );
}
