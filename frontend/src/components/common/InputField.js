import './InputField.scss';

export default function InputField({
  type,
  name,
  id,
  value = '',
  placeholder,
  onChange,
  autoComplete = 'on',
  index = 0,
}) {
  return (
    <div className="input-group mb-2">
      {type === 'textarea' ? (
        <div className="d-flex flex-column w-100">
          <label htmlFor={id} className="form-label text-start">
            {placeholder}
          </label>
          <textarea
            className="form-control"
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            autoComplete={autoComplete}
            rows={4}
          />
        </div>
      ) : (
        <input
          type={type}
          className="form-control"
          id={id}
          index={index}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete={autoComplete}
        />
      )}
    </div>
  );
}
