export default function Switch({
  name, id, label, onChange,
}) {
  return (
    <div className="form-check form-switch">
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
        {label}
      </label>
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        name={name}
        id={id}
        onChange={onChange}
      />
    </div>
  );
}
