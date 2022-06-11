import './PlantCard.scss';
import { useNavigate } from 'react-router-dom';

export default function PlantCard({ name, imageKey, id }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/plant/${id}`);
  };

  return (
    <div className="card d-flex default-bg mt-3 col">
      <button
        type="button"
        className="border border-0 bg-white"
        onClick={handleClick}
      >
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
      </button>
    </div>
  );
}
