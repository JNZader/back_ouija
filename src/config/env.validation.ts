import Joi from 'joi';

export const validationSchema = {
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3001),
  DATABASE_URL: Joi.string().uri().required(),
  CORS_ORIGINS: Joi.string().required(),
  THROTTLE_SHORT_TTL: Joi.number().default(1000),
  THROTTLE_SHORT_LIMIT: Joi.number().default(3),
  THROTTLE_MEDIUM_TTL: Joi.number().default(10000),
  THROTTLE_MEDIUM_LIMIT: Joi.number().default(20),
  THROTTLE_LONG_TTL: Joi.number().default(60000),
  THROTTLE_LONG_LIMIT: Joi.number().default(100),
};
