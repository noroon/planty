import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import PlantCard from './PlantCard';

export default function Plants() {
  const [plants, setPlants] = useState([]);

  const getPlants = async () => {
    try {
      const res = await axios.get('/plants');
      return res.data.plants;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getPlants().then((plantList) => {
      setPlants(plantList);
    });
  }, []);

  return (
    <div className="d-flex justify-content-center mb-5">
      <div className="row row-cols-1 row-cols-lg-5 row-cols-sm-2 mx-auto">
        {plants.length > 0
        && plants.map((plant) => {
          const { name, imageKey, _id: id } = plant;
          {/* const id = plant._id; */}

          return (
            <PlantCard key={id} name={name} imageKey={imageKey} id={id} />
          );
        })}
      </div>
    </div>
  );
}
