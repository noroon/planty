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
            <p className="card-title mt-3 mb-3">Földkeverék hozzáadása</p>
            <div className="card-image d-flex justify-content-center mb-2">
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
              <div
                className="potting-mix-card d-flex default-bg mt-3 col"
                key={`mix-${name}`}
              >
                <PottingMixCard
                  name={name}
                  ingredients={ingredients}
                  description={description}
                  id={id}
                />
                <div
                  className="modal fade"
                  id={`pottingMixModal-${id}`}
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content default-bg">
                      <div className="modal-header">
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body">
                        <p className="card-title">
                          {name}
                        </p>
                        <ul>
                          {ingredients.map((item) => (
                            <li key={`${item}-${name}`}>{item}</li>
                          ))}
                        </ul>
                        <p className="ps-4 pe-4 pb-3 pt-2">{description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
