import { useState } from 'react';
import { handleChange } from '../utils';
import { Alert, InputGroup } from './general';
import './PlantRequest.scss';

export default function PlantRequest() {
  const [plant, setPlant] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const postRequest = () => {};

  const validate = () => {
    let err = '';

    if (!plant.name) {
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
      postRequest()
        .then((data) => {
          if (data.status === 200) setSuccessMessage('A kérést elküldtük');
        })
        .catch((err) => {
          setAlertMessage(err.message);
        });
    }
    setPlant('');
    setAlertMessage('');
    setSuccessMessage('');
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
