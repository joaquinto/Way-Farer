export default class validator {
  static signUpValidation(req, res, next) {
    req.checkBody('firstname').not().isEmpty().withMessage('Firstname is required.')
      .isLength({ min: 1 })
      .withMessage('Firstname should have more than one character.')
      .isAlpha()
      .withMessage('Firstname must be alphabets.');
    req.checkBody('lastname').not().isEmpty().withMessage('Lastname is required.')
      .isLength({ min: 1 })
      .withMessage('Lastname should have more than one character.')
      .isString()
      .withMessage('Firstname must be string.');
    req.checkBody('email').not().isEmpty().withMessage('Email is required.')
      .isEmail()
      .withMessage('Email must be a valid email.')
      .isLength({ min: 5 })
      .withMessage('Email should have more than 5 characters')
      .isLength({ max: 50 })
      .withMessage('Email should not have more than 50 characters.')
      .normalizeEmail()
      .trim();
    req.checkBody('password').not().isEmpty().withMessage('Password is required.')
      .isLength({ min: 6 })
      .withMessage('Password length must not be less than 6 characters.')
      .matches('[0-9]')
      .withMessage('Password must contain at least a number.')
      .matches('[a-z]')
      .withMessage('Password must contain at least a lowercase letter.')
      .matches('[A-Z]')
      .withMessage('Password must contain at least an uppercase letter.');
    req.asyncValidationErrors()
      .then(next)
      .catch(errors => res.status(400).json({ status: 400, error: errors.map(err => err.msg) }));
  }
}
