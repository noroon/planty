import {
  sprayer, sun, can, dog, cutlery, terrarium,
} from '../assets/icons/32';
import './PlantCard.scss';

export default function PlantCard({ plant }) {
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
        <div className="w-50">
          <h1 className="card-title mb-5">{name}</h1>
          <div className="plant-needs">
            <div className="d-flex">
              <div className="image-container d-flex justify-content-center align-items-center mb-0 p-0">
                <img src={sun} alt="" />
              </div>
              <p className="">
                {/* eslint-disable */}
                {light < 2 ? 'alacsony ' : light > 2 ? 'nagy ' : 'közepes '}
                fényigényű
              </p>
            </div>
            <div className="d-flex">
              <div className="image-container d-flex justify-content-center align-items-center mb-0 p-0">
                <img src={can} alt="" />
              </div>
              <p className="">
                {/* eslint-disable */}
                {water < 2 ? 'alacsony ' : water > 2 ? 'nagy ' : 'közepes '}
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
                  ? 'nagy '
                  : 'közepes '}
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
        </div>
      </div>
      <div className="card-body">
        <h4 className="mb-4">Gondozás</h4>
        <p className="">{care}</p>
      </div>
    </div>
  );
}
