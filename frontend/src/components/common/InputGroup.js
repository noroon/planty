export default function InputGroup({
  name,
  id,
  value = '',
  placeholder,
  onChange,
  buttonText,
}) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        name={name}
        value={value}
        className="form-control"
        placeholder={placeholder}
        aria-label="Recipient's username"
        aria-describedby={id}
        onChange={onChange}
        autoComplete="off"
      />
      <button type="submit" className="input-group-text" id={id}>
        {buttonText}
      </button>
    </div>
  );
}
