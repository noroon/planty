import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../config/axiosConfig';

import { Alert } from '../components/general';
import PlantCard from '../components/PlantCard';

export default function Plant() {
  const { id } = useParams();
  const [plant, setPlant] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const getPlant = async () => {
    try {
      const res = await axios.get(`/plant/${id}`);
      return res.data.plantById;
    } catch (err) {
      setAlertMessage(err.message);
      return err;
    }
  };

  useEffect(() => {
    getPlant().then((plantById) => {
      setPlant(plantById);
    });
  }, []);

  return (
    <div className="container">
      {plant && <PlantCard plant={plant} />}
      {alertMessage && <Alert className="alert-danger" value={alertMessage} />}
    </div>
  );
}
