export const handleChange = ({ target }, formData, setFormData) => {
  const isCheckbox = target.type === 'checkbox';

  setFormData({
    ...formData,
    [target.name]: isCheckbox ? target.checked : target.value,
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
