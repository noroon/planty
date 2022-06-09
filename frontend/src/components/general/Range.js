export default function Range({
  name, id, label, onChange, min, max, steps,
}) {
  return (
    <div className="mb-3 d-flex">
      <label className="form-label me-2" htmlFor={id}>
        {label}
      </label>
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
  );
}
