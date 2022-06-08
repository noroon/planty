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
      {iconClass && (
        <div className="input-group-text">
          <Icon className={iconClass} />
        </div>
      )}
      {type === 'textarea' ? (
        <textarea
          className="form-control"
          // className={
          //   'form-control ' + getValidationClassName(errorMessage, wasValidated)
          // }
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete={autoComplete}
        />
      ) : (
        <input
          type={type}
          className="form-control"
          // className={
          //   'form-control ' + getValidationClassName(errorMessage, wasValidated)
          // }
          id={id}
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
