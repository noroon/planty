export default function Range({
  name, id, label, onChange, min, max, steps,
}) {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        type="range"
        className="form-range"
        name={name}
        id={id}
        min={min}
        max={max}
        step={steps}
        defaultValue={0}
        onChange={onChange}
      />
    </div>
  );
}
