import { useState } from 'react';

import axios from '../api/axios';
import { handleChange } from '../utils';
import { useAuthState } from '../context';

import {
  Alert,
  Button,
  InputField,
  Range,
  Switch,
} from '../components/general';

export default function AddPlant() {
  const user = useAuthState();

  const [plantData, setPlantData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [file, setFile] = useState();

  const selectFile = (e) => {
    const img = e.target.files[0];
    setFile(img);
    handleChange(e, plantData, setPlantData);
  };

  const validate = () => {
    let err = '';

    if (!plantData.name) {
      err = 'All fields are required.';
      setAlertMessage(err);
      return false;
    }
    return true;
  };

  async function postImage({ image }) {
    const formData = new FormData();
    formData.append('image', image);
    // Object.entries(plantData).forEach(([key, value]) => {
    //   let defaultValue;
    //   if (key === 'care') defaultValue = 'feltöltés alatt';
    //   if (key === 'moisture' || key === 'water' || key === 'light') {
    //     defaultValue = 0;
    //   }
    //   if (key === 'petfriendly' || key === 'edible' || key === 'easyToCare') {
    //     defaultValue = false;
    //   }
    //   formData.append(key, value || defaultValue);
    // });
    const {
      name,
      moisture,
      water,
      light,
      petfriendly,
      edible,
      easyToCare,
      care,
    } = plantData;
    formData.append('name', name);
    formData.append('moisture', moisture || 0);
    formData.append('water', water || 0);
    formData.append('light', light || 0);
    formData.append('petfriendly', petfriendly || false);
    formData.append('edible', edible || false);
    formData.append('easyToCare', easyToCare || false);
    formData.append('care', care || 'feltöltés alatt');

    const res = await axios.post('/admin/new-plant', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.token}`,
      },
    });
    return res;
  }
  console.log(user.token)
  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validate();

    if (isValid) {
      postImage({ image: file })
        .then((data) => {
          if (data.status === 200) setSuccessMessage('Sikeres felvitel');
        })
        .catch((err) => {
          setAlertMessage(err.message);
        });
    }
    setPlantData({});
    setAlertMessage('');
    setSuccessMessage('');
  };

  return (
    <div className="container plant-form mx-auto">
      {alertMessage && <Alert className="alert-danger" value={alertMessage} />}
      {successMessage && (
        <Alert className="alert-success" value={successMessage} />
      )}
      <form onSubmit={handleSubmit} noValidate>
        <legend className="mb-5">Növény hozzáadása</legend>
        <InputField
          type="text"
          name="name"
          id="name"
          placeholder="név"
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
          data-buttonText="Kép feltöltése"
        />
        <Range
          name="light"
          id="light"
          label="fényigény"
          min={0}
          max={3}
          step={1}
          value={plantData.light}
          onChange={(e) => handleChange(e, plantData, setPlantData)}
        />
        <Range
          name="water"
          id="water"
          label="vízigény"
          min={0}
          max={3}
          step={1}
          value={plantData.water}
          onChange={(e) => handleChange(e, plantData, setPlantData)}
        />
        <Range
          name="moisture"
          id="moisture"
          label="pára"
          min={0}
          max={3}
          step={1}
          value={plantData.moisture}
          onChange={(e) => handleChange(e, plantData, setPlantData)}
        />
        <Switch
          name="edible"
          id="edible"
          label="ehető"
          onChange={(e) => handleChange(e, plantData, setPlantData)}
        />
        <Switch
          name="petfriendly"
          id="petfriendly"
          label="állatbarát"
          onChange={(e) => handleChange(e, plantData, setPlantData)}
        />
        <Switch
          name="easyToCare"
          id="easyToCare"
          label="könnyen gondozható"
          onChange={(e) => handleChange(e, plantData, setPlantData)}
        />
        <InputField
          type="textarea"
          name="care"
          id="care"
          placeholder="gondozás"
          value={plantData.care}
          onChange={(e) => handleChange(e, plantData, setPlantData)}
          autoComplete="off"
        />
        <Button type="submit" className="btn-primary" value="Hozzáadás" />
      </form>
    </div>
  );
}
