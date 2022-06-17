import Joi from 'joi';

export const registerSchema = Joi.object({
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

export const profileSchema = Joi.object({
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

export const loginSchema = Joi.object({
  email: Joi.string()
    .required()
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
});

export const newsletterSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'Létező email-címet adj meg!',
      'string.empty': 'Add meg az email-címed!',
      'any.required': 'Add meg az email-címed!',
    }),
});

export const requestSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Add meg a növény nevét!',
    'string.empty': 'Add meg a növény nevét!',
  }),
});

export const plantSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Add meg a növény nevét!',
    'string.empty': 'Add meg a növény nevét!',
  }),
  image: Joi.string().required().messages({
    'any.required': 'Tölts fel képet!',
    'string.empty': 'Tölts fel képet!',
  }),
  light: Joi.number().required().integer().min(1).messages({
    'any.required': 'Add meg a fényigényt!',
    'string.empty': 'Add meg a fényigényt!',
  }),
  water: Joi.number().required().integer().min(1).messages({
    'any.required': 'Add meg a növény vízigényét!',
    'string.empty': 'Add meg a növény vízigényét!',
  }),
  moisture: Joi.number().required().integer().min(1).messages({
    'any.required': 'Add meg a növény páraigényét!',
    'string.empty': 'Add meg a növény páraigényét!',
  }),
  care: Joi.string().required().messages({
    'any.required': 'Adj leírást a gondozáshoz!',
    'string.empty': 'Adj leírást a gondozáshoz!',
  }),
});

export default function validateForm(schema, formData, setState) {
  const result = schema.validate(formData);
  const { error } = result;
  if (error) {
    setState(error.message);
    return false;
  }
  return true;
}
