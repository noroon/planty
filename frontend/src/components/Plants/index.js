import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from '../../api/axios';
import PlantCard from './PlantCard';

export default function Plants() {
  const [plants, setPlants] = useState('');

  async function getPlants() {
    try {
      const res = await axios.get('/articles');
      return res.data.articles;
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    getPlants().then((plantList) => {
      setPlants(plantList);
    });
  }, []);

  return (
    <div className="row row-cols-1 row-cols-lg-5 row-cols-sm-3 mx-auto">
      {plants
      && plants.map((plant) => {
        const { title, content } = plant;
        const id = plant._id;
        const publishDate = moment(plant.publish_date).fromNow();

        return (
          <PlantCard
            key={id}
            title={title}
            content={content}
            publishDate={publishDate}
          />
        );
      })}
    </div>
  );
}
