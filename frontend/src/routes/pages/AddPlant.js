import { useState, useRef } from 'react';

import axios from '../../api/axios';
import { handleChange } from '../../utils';
import { useAuthState } from '../../context';
import validateForm, { plantSchema } from '../../utils/validation';

import {
  Alert,
  Button,
  InputField,
  Range,
  Switch,
} from '../../components/common';

export default function AddPlant() {
  const formRef = useRef();
  const user = useAuthState();

  const [plantData, setPlantData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [file, setFile] = useState();

  const resetForm = () => {
    setPlantData({});
    formRef.current.reset();
    setAlertMessage('');
    setSuccessMessage('');
  };
  const selectFile = (e) => {
    const img = e.target.files[0];
    setFile(img);
    handleChange(e, plantData, setPlantData);
  };

  async function postImage({ image }) {
    const formData = new FormData();
    formData.append('image', image);
    Object.entries(plantData).forEach(([key, value]) => {
      formData.append(`${key}`, value);
    });

    const res = await axios.post('/admin/new-plant', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.token}`,
      },
    });
    return res;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm(plantSchema, plantData, setAlertMessage);

    if (isValid) {
      postImage({ image: file })
        .then((data) => {
          if (data.status === 200) setSuccessMessage('Sikeres felvitel');
        })
        .catch((err) => {
          setAlertMessage(err.message);
        });
      resetForm();
    }
  };

  return (
    <div className="container plant-form mx-auto">
      {alertMessage && <Alert className="alert-danger" value={alertMessage} />}
      {successMessage && (
        <Alert className="alert-success" value={successMessage} />
      )}
      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <legend className="mb-5">N??v??ny hozz??ad??sa</legend>
        <InputField
          type="text"
          name="name"
          id="name"
          placeholder="n??v"
          onChange={(e) => handleChange(e, plantData, setPlantData)}
          value={plantData.name}
          autoComplete="off"
        />
        <InputField
          type="file"
          name="image"
          id="image"
          onChange={selectFile}
          value={plantData.image}
          accept="/image/*"
          data-buttonText="K??p felt??lt??se"
        />
        <Range
          name="light"
          id="light"
          label="f??nyig??ny"
          min={0}
          max={3}
          step={1}
          value={plantData.light}
          onChange={(e) => handleChange(e, plantData, setPlantData)}
        />
        <Range
          name="water"
          id="water"
          label="v??zig??ny"
          min={0}
          max={3}
          step={1}
          value={plantData.water}
          onChange={(e) => handleChange(e, plantData, setPlantData)}
        />
        <Range
          name="moisture"
          id="moisture"
          label="p??ra"
          min={0}
          max={3}
          step={1}
          value={plantData.moisture}
          onChange={(e) => handleChange(e, plantData, setPlantData)}
        />
        <Switch
          name="edible"
          id="edible"
          label="ehet??"
          onChange={(e) => handleChange(e, plantData, setPlantData)}
        />
        <Switch
          name="petfriendly"
          id="petfriendly"
          label="??llatbar??t"
          onChange={(e) => handleChange(e, plantData, setPlantData)}
        />
        <Switch
          name="easyToCare"
          id="easyToCare"
          label="k??nnyen gondozhat??"
          onChange={(e) => handleChange(e, plantData, setPlantData)}
        />
        <InputField
          type="textarea"
          name="care"
          id="care"
          placeholder="gondoz??s"
          value={plantData.care}
          onChange={(e) => handleChange(e, plantData, setPlantData)}
          autoComplete="off"
        />
        <Button type="submit" className="btn-primary" value="Hozz??ad??s" />
      </form>
    </div>
  );
}
