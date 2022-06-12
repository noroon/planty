import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Add meg a neved!',
    'string.empty': 'Add meg a neved!',
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'Létező email-címet adj meg!',
      'string.empty': 'Add meg az email-címed!',
      'any.required': 'Add meg az email-címed!',
    }),
  password: Joi.string().min(8).required().messages({
    'any.required': 'Add meg a jelszavad!',
    'string.empty': 'Add meg a jelszavad!',
    'string.min': 'A jelszó minimum 8 karakter legyen!',
  }),
  passwordConfirm: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.required': 'Erősítsd meg a jelszavad!',
    'string.empty': 'Erősítsd meg a jelszavad!',
    'any.only': 'A jelszavaknak meg kell egyezniük',
  }),
});

const profileSchema = Joi.object({
  name: Joi.string().messages({
    'any.required': 'Add meg a neved!',
    'string.empty': 'Add meg a neved!',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'Létező email-címet adj meg!',
      'string.empty': 'Add meg az email-címed!',
      'any.required': 'Add meg az email-címed!',
    }),
  password: Joi.string().min(8).messages({
    'any.required': 'Add meg a jelszavad!',
    'string.empty': 'Add meg a jelszavad!',
    'string.min': 'A jelszó minimum 8 karakter legyen!',
  }),
  passwordConfirm: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.required': 'Erősítsd meg a jelszavad!',
    'string.empty': 'Erősítsd meg a jelszavad!',
    'any.only': 'A jelszavaknak meg kell egyezniük',
  }),
});

export default function validateForm(schemaName, formData, setState) {
  let schema;
  switch (schemaName) {
    case 'profileSchema':
      schema = profileSchema;
      break;
    case 'registerSchema':
      schema = registerSchema;
      break;
    default:
      setState('Ne haragudj, valami hiba történt');
  }
  const result = schema.validate(formData);
  const { error } = result;
  if (error) {
    setState(error.message);
    return false;
  }
  return true;
}
