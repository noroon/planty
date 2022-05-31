import Icon from './Icon';

export default function InputField({
  type,
  name,
  id,
  value = '',
  placeholder,
  onChange,
  iconClass,
  autoComplete = 'on',
}) {
  return (
    <div className="input-group mb-2">
      <div className="input-group-text">
        <Icon className={iconClass} />
      </div>
      <input
        type={type}
        className="form-control"
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    </div>
  );
}
