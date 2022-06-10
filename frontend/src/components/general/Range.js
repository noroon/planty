export default function Range({
  name, id, label, onChange, min, max, steps,
}) {
  return (
    <div className="mb-3 d-flex">
      <div className="range-label">
        <label className="form-label me-2" htmlFor={id}>
          {label}
        </label>
      </div>
      <div className="d-flex justify-content-center w-100">
        <div className="range-slider">
          <input
            type="range"
            className="form-range rs-range"
            name={name}
            id={id}
            min={min}
            max={max}
            step={steps}
            defaultValue={0}
            onChange={onChange}
          />
          <div className="box-minmax">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
