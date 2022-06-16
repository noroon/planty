import { useState, useEffect } from 'react';
import axios from '../api/axios';
import PlantCard from '../components/Plants/PlantCard';
import { useAuthState } from '../context';

export default function MyCollection() {
  const user = useAuthState();
  const [plants, setPlants] = useState([]);

  const getMyPlants = async () => {
    try {
      const res = await axios.get('/plants');
      return res.data.plants;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getMyPlants().then((plantList) => {
      const { myCollection } = user.userDetails;
      if (myCollection) {
        const filteredList = plantList.filter((plant) => {
          return myCollection.includes(plant._id);
        });
        setPlants(filteredList);
      }
    });
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-center mb-5">
        <div className="row row-cols-1 row-cols-lg-5 row-cols-sm-2 mx-auto">
          {plants.length > 0 &&
            plants.map((plant) => {
              const { name, imageKey } = plant;
              const id = plant._id;

              return (
                <PlantCard key={id} name={name} imageKey={imageKey} id={id} />
              );
            })}
        </div>
      </div>
    </div>
  );
}
