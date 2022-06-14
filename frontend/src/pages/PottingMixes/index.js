import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../../api/axios';
import PottingMixCard from './PottingMixCard';
import soilIcon from '../../assets/icons/gardening.png';
import './style.scss';

export default function PottingMixes() {
  const navigate = useNavigate();
  const [pottingMixes, setpottingMixes] = useState([]);

  const getpottingMixes = async () => {
    try {
      const res = await axios.get('/potting-mixes');
      return res.data.pottingMixes;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getpottingMixes().then((pottingMixList) => {
      setpottingMixes(pottingMixList);
    });
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="row row-cols-1 row-cols-lg-5 row-cols-sm-2 mx-auto">
        <div className="potting-mix-card d-flex justify-content-center default-bg mt-3 col">
          <button
            type="button"
            className="border border-0 bg-white d-flex flex-column align-items-center"
            onClick={() => navigate('../add-potting-mix')}
          >
            <div className="card-body">
              <p className="card-title card-title-line-clamp mb-0">
                Földkeverék hozzáadása
              </p>
            </div>
            <div className="card-image">
              <img src={soilIcon} className="card-img-top" alt="" />
            </div>
          </button>
        </div>
        {/* eslint-disable */}
        {pottingMixes.length > 0 &&
          pottingMixes.map((pottingMix) => {
            const { name, ingredients, description } = pottingMix;
            const id = pottingMix._id;

            return (
              <PottingMixCard
                key={id}
                name={name}
                ingredients={ingredients}
                description={description}
                id={id}
              />
            );
          })}
      </div>
    </div>
  );
}
