// middleware/validateContact.js
import Joi from "joi";

const contactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long"
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format"
  }),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required().messages({
    "string.empty": "Phone number is required",
    "string.pattern.base": "Phone number must be 10-15 digits long"
  }),
  address: Joi.string().optional()
});

const validateContact = (req, res, next) => {
  const { error } = contactValidationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      error: "Validation failed",
      details: error.details.map(err => err.message)
    });
  }
  next();
};

export default validateContact;
