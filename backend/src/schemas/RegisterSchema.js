const Joi = require('joi');

const registerValidation = Joi.object({
  username: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Username must be a string',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username cannot exceed 50 characters',
      'any.required': 'Username is required'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .min(4)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/)
    .required()
    .messages({
      'string.min': 'Password must be at least 4 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required'
    }),
  phone: Joi.string()
    .pattern(/^07[2,3,8,9][0-9]{7}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Please provide a valid phone number'
    }),
     role: Joi.string()
    .valid('USER', 'ADMIN') // Only allow these roles
    .default('USER')
    .optional()
    .messages({
      'string.base': 'Role must be a string',
      'any.only': 'Role must be either USER or ADMIN'
    })
});



const parkingSlotSchema = Joi.object({
  spotId: Joi.string().required(),
  price: Joi.number().positive().required(),
  type: Joi.string().valid("Standard", "Disabled").required(),
  location: Joi.string().required(),
  status: Joi.string().valid("Available", "unavailable", "pending").default("Available"),
  bookings: Joi.array().items(Joi.object({
    // Define the structure for each booking object here
    // Example: 
    id: Joi.number().integer(),
    userId: Joi.string().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
  }))
});



const bookingSchema = Joi.object({
  userId: Joi.number().integer().required(),
  slotId: Joi.number().integer().required(),
  status: Joi.string().valid("pending", "approved", "rejected").default("Pending"),
});

module.exports = {registerValidation,parkingSlotSchema,bookingSchema};

