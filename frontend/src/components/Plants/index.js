import { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';
import PlantCard from './PlantCard';

export default function Plants() {
  const [plants, setPlants] = useState([]);

  async function getPlants() {
    try {
      const res = await axios.get('/plants');
      return res.data.plants;
    } catch (err) {
      return err;
    }
  }

  useEffect(() => {
    getPlants().then((plantList) => {
      setPlants(plantList);
    });
  }, []);

  return (
    <div className="row row-cols-1 row-cols-lg-5 row-cols-sm-3 mx-auto">
      {plants.length > 0
      && plants.map((plant) => {
        const { name, imageKey } = plant;
        const id = plant._id;

        return (
          <PlantCard
            key={id}
            name={name}
            imageKey={imageKey}
          />
        );
      })}
    </div>
  );
}
