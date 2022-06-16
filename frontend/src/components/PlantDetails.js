import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sprayer, sun, can, dog, cutlery, terrarium } from '../assets/icons/32';
import './PlantDetails.scss';
import { Button, Alert } from './general';
import { useAuthState, updateMyCollection, useAuthDispatch } from '../context';

export default function PlantDetails({ plant }) {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const [alertMessage, setAlertMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const user = useAuthState();
  const {
    name,
    moisture,
    water,
    light,
    petfriendly,
    edible,
    easyToCare,
    care,
    imageKey,
  } = plant;
  const plantId = plant._id;
console.log(user.userDetails.email);
  const handleClick = async () => {
    if (!user.userDetails) {
      navigate('/register');
    } else {
      try {
        const res = await updateMyCollection(
          dispatch,
          { plantId },
          user.token,
          user.userDetails.userId
        );
        if (res.message) {
          setAlertMessage(res.message);
        } else {
          setSuccessMessage('Sikeresen betetted a gyűjteményedbe!');
        }
      } catch (err) {
        setAlertMessage(err.message);
      }
    }
  };

  return (
    <div className="plant-card default-bg mt-3 col">
      <div className="card-head">
        <div className="card-image">
          <img
            src={`${process.env.REACT_APP_API_SERVER}/images/${imageKey}`}
            className="card-img-top"
            alt=""
          />
        </div>
        <div>
          <h1 className="card-title mb-5">{name}</h1>
          <div className="plant-needs">
            <div className="d-flex">
              <div className="image-container d-flex justify-content-center align-items-center mb-0 p-0">
                <img src={sun} alt="" />
              </div>
              <p>
                {/* eslint-disable */}
                {light < 2 ? 'alacsony ' : light > 2 ? 'nagy ' : 'közepes '}
                fényigényű
              </p>
            </div>
            <div className="d-flex">
              <div className="image-container d-flex justify-content-center align-items-center mb-0 p-0">
                <img src={can} alt="" />
              </div>
              <p>
                {/* eslint-disable */}
                {water < 2 ? 'alacsony ' : water > 2 ? 'nagy ' : 'átlagos '}
                vízigényű
              </p>
            </div>
            <div className="d-flex">
              <div className="image-container d-flex justify-content-center align-items-center mb-0 p-0">
                <img src={sprayer} alt="" />
              </div>
              <p className="">
                {/* eslint-disable */}
                {moisture < 2
                  ? 'alacsony '
                  : moisture > 2
                  ? 'magas '
                  : 'átlagos '}
                páratartalmat kedveli
              </p>
            </div>
            {petfriendly && (
              <div className="d-flex">
                <div className="image-container d-flex justify-content-center align-items-center mb-0 p-0">
                  <img src={dog} alt="" />
                </div>
                <p className="">állatbarát</p>
              </div>
            )}
            {edible && (
              <div className="d-flex">
                <div className="image-container d-flex justify-content-center align-items-center mb-0 p-0">
                  <img src={cutlery} alt="" />
                </div>
                <p className="">ehető</p>
              </div>
            )}
            {easyToCare && (
              <div className="d-flex">
                <div className="image-container d-flex justify-content-center align-items-center mb-0 p-0">
                  <img src={terrarium} alt="" />
                </div>
                <p className="">könnyen gondozható</p>
              </div>
            )}
          </div>
          {alertMessage && (
            <Alert className="alert-danger" value={alertMessage} />
          )}
          {successMessage && (
            <Alert className="alert-success" value={successMessage} />
          )}
          <Button
            className="btn-simple align-self-end mt-3"
            value={
              user.userDetails
                ? 'Hozzáadom a gyűjteményemhez'
                : 'Regisztrálj a gyűjteményhez való hozzáadáshoz'
            }
            onClick={handleClick}
          />
        </div>
      </div>
      <div className="card-body">
        <h4 className="mb-4">Gondozás</h4>
        <p className="">{care}</p>
      </div>
    </div>
  );
}
