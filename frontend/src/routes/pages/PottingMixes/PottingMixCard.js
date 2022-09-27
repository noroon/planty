export default function PottingMixCard({
  name, description, id,
}) {
  return (
    <div className="">
      <button
        type="button"
        className="border border-0 bg-white"
        data-bs-toggle="modal"
        data-bs-target={`#pottingMixModal-${id}`}
      >
        <div className="card-body">
          <p className="card-title card-title-line-clamp">{name}</p>
        </div>
        <p className="card-description-line-clamp mb-0">{description}</p>
      </button>
    </div>
  );
}
