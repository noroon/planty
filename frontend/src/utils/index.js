export const handleChange = ({ target }, formData, setFormData) => {
  const {name, value, type, checked} = target
  const isCheckbox = type === 'checkbox';

  setFormData({
    ...formData,
    [name]: isCheckbox ? checked : value,
  });
};

export const getValidationClassName = (errorMessage, wasValidated) => {
  const isValid = errorMessage === '';
  const additionalClass = '';
  if (wasValidated === 'was-validated') {
    return isValid ? 'is-valid' : 'is-invalid';
  }
  return additionalClass;
};
