export const handleChange = ({ target }, formData, setFormData) => {
  const isCheckbox = target.type === 'checkbox';
  const isImage = target.type === 'file';

  setFormData({
    ...formData,
    /* eslint-disable */
    [target.name]: isCheckbox ? target.checked : (isImage ? target.files[0] : target.value),
  });
  console.log(formData);
};

export const getValidationClassName = (errorMessage, wasValidated) => {
  const isValid = errorMessage === '';
  const additionalClass = '';
  if (wasValidated === 'was-validated') {
    return isValid ? 'is-valid' : 'is-invalid';
  }
  return additionalClass;
};
