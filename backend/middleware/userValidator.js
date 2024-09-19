const { check, validationResult } = require("express-validator");

const createValidators = () => [
  check("firstName", "First name is required").isString(),
  check("lastName", "Last name is required").isString(),
  check("email", "Email is required").isEmail(),
  check("contact", "Contact is required").isString(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
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
