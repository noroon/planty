import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import { handleChange } from '../utils';
import axios from '../config/axiosConfig';

import {
  Alert,
  Button,
  InputField,
  Range,
  Switch,
} from '../components/general';

export default function AddPlant() {
  const [plantData, setPlantData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');

  const [file, setFile] = useState();

  const selectFile = (event) => {
    const img = event.target.files[0];
    setFile(img);
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

    const result = await axios.post('/admin/new-plant', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return result.data;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validate();

    if (isValid) {
      postImage({ image: file })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch(() => {
          setAlertMessage('Something went wrong.');
        });
    }
  };

  return (
    <div className="container plant-form mx-auto">
      {alertMessage && <Alert className="alert-danger" value={alertMessage} />}
      <form
        onSubmit={handleSubmit}
        noValidate
      >
        <legend className="mb-5">Növény hozzáadása</legend>
        {/* name, moisture, water, light, petfriendly, edible, easyToCare, care, */}
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
          // onChange={(e) => handleChange(e, plantData, setPlantData)}
          onChange={selectFile}
          // value={file ? file.name : 'Nincs fájl kiválasztva'}
          accept="/image/*"
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
        <Button
          type="submit"
          className="btn-primary"
          value="Hozzáadás"
        />
      </form>
    </div>
  );
}
