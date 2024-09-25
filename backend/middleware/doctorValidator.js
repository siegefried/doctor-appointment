const { check, validationResult } = require("express-validator");

const createValidators = () => [
  check("userId", "User id is required").isString(),
  check("firstName", "First name is required").isString(),
  check("lastName", "Last name is required").isString(),
  check("contact", "Contact is required").isString(),
  check("email", "Email is required").isEmail(),
  check("website", "Website is required").isString(),
  check("address", "Address is required").isString(),
  check("specialization", "Specialization is required").isString(),
  check("experience", "Experience is required").isString(),
  check("costPerConsult", "Cost per booking is required").isNumeric(),
    check("schedule", "Schedule is required").isArray({
      min: 2,
    }),
];

const reporter = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  add: [createValidators(), reporter],
};
