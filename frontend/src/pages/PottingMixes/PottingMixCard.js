import { useNavigate } from 'react-router-dom';

export default function PottingMixCard({ name, ingredients, description, id }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/potting-mix/${id}`);
  };

  return (
    <div className="potting-mix-card d-flex default-bg mt-3 col">
      <button
        type="button"
        className="border border-0 bg-white"
        onClick={handleClick}
      >
        <div className="card-body">
          <p className="card-title card-title-line-clamp mb-0">{name}</p>
          <ul>
            {ingredients.map((item) => (
              <li key={`${name}${item}`}>{item}</li>
            ))}
          </ul>
        </div>
        <p className="card-title card-title-line-clamp mb-0">{description}</p>
      </button>
    </div>
  );
}
