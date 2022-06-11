import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name, email and password are required.',
    'string.empty': 'Name, email and password are required.',
  }),
  password: Joi.string().min(8).required().messages({
    'any.required': 'Name, email and password are required.',
    'string.empty': 'Name, email and password are required.',
    'string.min': 'Password must be at least 8 characters.',
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'Email must be a valid email',
      'string.empty': 'Name, email and password are required.',
      'any.required': 'Name, email and password are required.',
    }),
  passwordConfirm: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.required': 'Password confirmation is required.',
    'string.empty': 'Password confirmation is required.',
    'any.only': "Password and it's confirmation are not same",
  }),
});

const profileSchema = Joi.object({
  name: Joi.string().messages({
    'any.required': 'A field is required to be filled.',
    'string.empty': 'A field is required to be filled.',
  }),
  password: Joi.string().min(8).messages({
    'any.required': 'A field is required to be filled.',
    'string.empty': 'A field is required to be filled.',
    'string.min': 'Password must be at least 8 characters.',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'Email must be a valid email.',
      'string.empty': 'A field is required to be filled.',
      'any.required': 'A field is required to be filled.',
    }),
  passwordConfirm: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.required': 'Password confirmation is required.',
    'string.empty': 'Password confirmation is required.',
    'any.only': "Password and it's confirmation are not same",
  }),
});

export default function validateForm(schema, formData, setAlertMessage) {
  let schema2;
  switch (schema) {
    case 'profileSchema':
      schema2 = profileSchema;
      break;
    case 'registerSchema':
      schema2 = registerSchema;
      break;
    default:
      setAlertMessage('Hiányzó validációs séma');
  }
  const result = schema2.validate(formData);
  const { error } = result;
  if (error) {
    setAlertMessage(error.message);
    return false;
  }
  return true;
}
