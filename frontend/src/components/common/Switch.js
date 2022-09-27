import './Switch.scss';

export default function Switch({ name, id, label, onChange }) {
  return (
    <div className="d-flex form-check form-switch mb-2 ms-0 ps-0">
      <div className="switch-label form-check-label me-2">
        <span>{label}</span>
      </div>
      <div className="range-slider">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          name={name}
          id={id}
          onChange={onChange}
        />
        {/* eslint-disable */}
        <label htmlFor={id} className="check-trail">
          <span className="check-handler" />
        </label>
      </div>
    </div>
  );
}
