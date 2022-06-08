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
}) {
  return (
    <div className="card d-flex default-bg mt-3 me-4 p-0 col">
      <div className="card-header p-3 pb-2 h-30">
        <h5 className="news-title-line-clamp mb-0 pb-1">{name}</h5>
      </div>
      <div className="card-body d-flex flex-column">
        <p className="card-text news-content-line-clamp">{moisture}</p>
      </div>
    </div>
  );
}
