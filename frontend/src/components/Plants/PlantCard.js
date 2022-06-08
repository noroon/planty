import './PlantCard.scss';

export default function PlantCard({
  name,
  moisture,
  // water,
  // light,
  // petfriendly,
  // edible,
  // easyToCare,
  // care,
  imageKey,
}) {
  return (
    <div className="card d-flex default-bg mt-3 me-4 p-0 col">
      <img
        src={`/plants/${imageKey}`}
        className="card-img-top"
        alt=""
        height="200"
        width="200"
      />
      <div className="card-body d-flex flex-column">
        <h5 className="news-title-line-clamp mb-0 pb-1">{name}</h5>
        <p className="card-text news-content-line-clamp">{moisture}</p>
      </div>
    </div>
  );
}
