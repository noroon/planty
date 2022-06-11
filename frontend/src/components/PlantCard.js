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
        <div>
          <h1 className="card-title">{name}</h1>
          <p className="">{moisture}</p>
          <p className="">{water}</p>
          <p className="">{light}</p>
          <p className="">{petfriendly}</p>
          <p className="">{edible}</p>
          <p className="">{easyToCare}</p>
        </div>
      </div>
      <div className="card-body">
        <h4 className="mb-4">Gondozás</h4>
        <p className="">{care}</p>
      </div>
    </div>
  );
}
