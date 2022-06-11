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
        <p className="">{moisture}</p>
        <p className="">{water}</p>
        <p className="">{light}</p>
        <p className="">{petfriendly}</p>
        <p className="">{edible}</p>
        <p className="">{easyToCare}</p>
        <p className="">{care}</p>
      </div>
    </div>
  );
}
