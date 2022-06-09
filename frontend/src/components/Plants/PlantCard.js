import './PlantCard.scss';

export default function PlantCard({
  name,
  moisture,
  water,
  light,
  petfriendly,
  edible,
  easyToCare,
  care,
  imageKey,
}) {
  return (
    <div className="card d-flex default-bg mt-3 me-4 p-0 col">
      <div className="image-container">
        <img
          src={`${process.env.REACT_APP_API_SERVER}/images/${imageKey}`}
          className="card-img-top"
          alt=""
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="news-title-line-clamp mb-0 pb-1">{name}</h5>
        <p className="card-text news-content-line-clamp">
          moisture:
          {moisture}
        </p>
        <p className="card-text news-content-line-clamp">
          water:
          {water}
        </p>
        <p className="card-text news-content-line-clamp">
          light:
          {light}
        </p>
        <p className="card-text news-content-line-clamp">
          petfriendly:
          {petfriendly}
        </p>
        <p className="card-text news-content-line-clamp">
          edible:
          {edible}
        </p>
        <p className="card-text news-content-line-clamp">
          easyToCare:
          {easyToCare}
        </p>
        <p className="card-text news-content-line-clamp">
          care:
          {care}
        </p>
      </div>
    </div>
  );
}
