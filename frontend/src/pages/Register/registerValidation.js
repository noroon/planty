import Joi from 'joi';

export const registerSchema = Joi.object({
  name:
      Joi.string()
        .required()
        .messages({
          'any.required': 'Name, email and password are required.',
          'string.empty': 'Name, email and password are required.',
        }),
  password:
      Joi.string()
        .min(8)
        .required()
        .messages({
          'any.required': 'Name, email and password are required.',
          'string.empty': 'Name, email and password are required.',
          'string.min': 'Password must be at least 8 characters.',
        }),
  email:
      Joi.string()
        .required()
        .email({ tlds: { allow: false } })
        .messages({
          'string.email': 'Email must be a valid email',
          'string.empty': 'Name, email and password are required.',
          'any.required': 'Name, email and password are required.',
        }),
  passwordConfirm:
      Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .messages({
          'any.required': 'Password confirmation is required.',
          'string.empty': 'Password confirmation is required.',
          'any.only': 'Password and it\'s confirmation are not same',
        }),
});

export default registerSchema;
