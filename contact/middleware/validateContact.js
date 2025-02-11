const Joi = require("joi");

// 🔍 Joi Schema for Contact Validation
const contactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required().messages({
    "string.pattern.base": "Phone number must be 10-15 digits long",
    "string.empty": "Phone number is required",
  }),
  address: Joi.string().optional(),
});

// 📌 Middleware Function for Validation
const validateContact = (req, res, next) => {
  const { error } = contactValidationSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ 
      error: "Validation failed", 
      details: error.details.map((err) => err.message) 
    });
  }

  next();
};

module.exports = validateContact;
