import './PlantCard.scss';

export default function PlantCard({
  name,
  imageKey,
}) {
  return (
    <div className="card d-flex default-bg mt-3 col">
      <div className="card-image">
        <img
          src={`${process.env.REACT_APP_API_SERVER}/images/${imageKey}`}
          className="card-img-top"
          alt=""
        />
      </div>
      <div className="card-body">
        <p className="card-title card-title-line-clamp mb-0">{name}</p>
      </div>
    </div>
  );
}
