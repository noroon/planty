import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import axios from '../api/axios';
import { handleChange } from '../utils';

import ImageUpload from './ImageUpload';
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
  // const navigate = useNavigate();
  // plantData.append('image', image);

  // const [file, setFile] = useState();
  // const fileSelected = (event) => {
  //   const img = event.target.files[0];
  //   console.log(img);
  //   setFile(img);
  // };

  const validate = () => {
    let err = '';

    if (!plantData.name) {
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
      // const {
      //   name,
      //   moisture,
      //   water,
      //   light,
      //   petfriendly,
      //   edible,
      //   easyToCare,
      //   care,
      // } = plantData;

      // try {
      //   const response = await axios.put(
      //     `${process.env.REACT_APP_API_SERVER}/admin/new-plant`,
      //     {
      //       name,
      //       moisture,
      //       water,
      //       light,
      //       petfriendly,
      //       edible,
      //       easyToCare,
      //       care,
      //     },
      //   );
      //   if (!response.token) return;
      //   navigate('/');
      // } catch (error) {
      //   console.log(error);
      // }

      // setPlantData({});
      // setAlertMessage('');
      const options = {
        method: 'POST',
        body: JSON.stringify({
          ...plantData,
          // image: file,
        }),
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      console.log(options);
      fetch(`${process.env.REACT_APP_API_SERVER}/admin/new-plant`, options)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch(() => {
          setAlertMessage(
            "Something went wrong. But don't worry, our best people are on it!",
          );
        });
    }
  };

  return (
    <div className="container login-form">
      {alertMessage && <Alert className="alert-danger" value={alertMessage} />}
      <ImageUpload />
      <form
        onSubmit={handleSubmit}
        noValidate
        className="align-middle mx-auto d-flex flex-column justify-content-center"
      >
        {/* name, moisture, water, light, petFriendly, edible, easyToCare, care, */}
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
          onChange={(e) => handleChange(e, plantData, setPlantData)}
          // onChange={fileSelected}
          // value={plantData.image}
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
          className="btn-primary mt-2 mb-2 mx-auto"
          value="Hozzáadás"
        />
      </form>
    </div>
  );
}
