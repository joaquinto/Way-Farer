/* eslint-disable no-useless-escape */
export default class validator {
  static signUpValidation(req, res, next) {
    req.checkBody('first_name').not().isEmpty().withMessage('Firstname is required.')
      .isLength({ min: 1 })
      .withMessage('Firstname should have more than one character.')
      .isAlpha()
      .withMessage('Firstname must be alphabets.');
    req.checkBody('last_name').not().isEmpty().withMessage('Lastname is required.')
      .isLength({ min: 1 })
      .withMessage('Lastname should have more than one character.')
      .isString()
      .withMessage('Lastname must be string.');
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
      .isLength({ min: 2 })
      .withMessage('Password length must not be less than 2 characters.');
    req.asyncValidationErrors()
      .then(next)
      .catch(errors => res.status(400).json({
        status: 'error',
        error: errors.map(err => err.msg),
      }));
  }

  static signInValidation(req, res, next) {
    req.checkBody('email').not().isEmpty().withMessage('Email is required.')
      .isEmail()
      .withMessage('Email must be valid.')
      .isLength({ min: 5 })
      .withMessage('Email should have more than 5 characters.')
      .isLength({ max: 50 })
      .withMessage('Email should not have more than 50 characters.')
      .normalizeEmail()
      .trim();
    req.checkBody('password').not().isEmpty().withMessage('Password is required.')
      .isLength({ min: 2 })
      .withMessage('Password length must not be less than 2 characters.');
    return req.asyncValidationErrors()
      .then(next)
      .catch(errors => res.status(400).json({
        status: 'error',
        error: errors.map(err => err.msg),
      }));
  }

  static tripValidation(req, res, next) {
    req.checkBody('bus_id').not().isEmpty().withMessage('Bus id is required')
      .isInt()
      .withMessage('Bus id must be an integer.')
      .isInt({ gt: 0 })
      .withMessage('Bus id are possitive integers.');
    req.checkBody('origin').not().isEmpty().withMessage('Origin is required.')
      .isLength({ min: 1 })
      .withMessage('Origin should have more than one character.')
      .matches(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)
      .withMessage('Origin does not match.');
    req.checkBody('destination').not().isEmpty().withMessage('Destination is required.')
      .isLength({ min: 1 })
      .withMessage('Destination should have more than one character.')
      .matches(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)
      .withMessage('Destination does not match.');
    req.checkBody('trip_date').not().isEmpty().withMessage('Trip date is required.')
      .isLength({ min: 10 })
      .withMessage('Trip date should have 10 characters.')
      .isISO8601()
      .withMessage('Trip date is not a valid date, input date in the format yyyy-mm-dd.');
    req.checkBody('fare').not().isEmpty().withMessage('Fare is required.')
      .isInt()
      .withMessage('Fare should be an integer.')
      .isInt({ gt: 15 })
      .withMessage('Fare should be greater than 15.')
      .isInt({ lt: 50000 })
      .withMessage('Fare should be less than 50,000.');
    req.asyncValidationErrors()
      .then(next)
      .catch(errors => res.status(400).json({
        status: 'error',
        error: errors.map(err => err.msg),
      }));
  }

  static bookingValidator(req, res, next) {
    req.checkBody('trip_id').not().isEmpty().withMessage('Trip ID is required.')
      .isInt()
      .withMessage('Trip ID should be an integer.')
      .isInt({ gt: 0 })
      .withMessage('Trip ID should be greater than 0.');
    req.checkBody('seat_number').optional()
      .isLength({ min: 1 })
      .withMessage('Seat Number should have more than one character.')
      .matches(/\d+(?:,\d+)*/)
      .withMessage('Seat Number does not match.');
    req.asyncValidationErrors()
      .then(next)
      .catch(errors => res.status(400).json({
        status: 'error',
        error: errors.map(err => err.msg),
      }));
  }

  static bookingIdParams(req, res, next) {
    req.checkParams('id').not().isEmpty().withMessage('Booking ID is required.')
      .isInt()
      .withMessage('Booking ID should be an integer.')
      .isInt({ gt: 0 })
      .withMessage('Booking ID should be greater than 0.');
    req.asyncValidationErrors()
      .then(next)
      .catch(errors => res.status(400).json({
        status: 'error',
        error: errors.map(err => err.msg),
      }));
  }

  static tripIdParams(req, res, next) {
    req.checkParams('id').not().isEmpty().withMessage('Trip ID is required.')
      .isInt()
      .withMessage('Trip ID should be an integer.')
      .isInt({ gt: 0 })
      .withMessage('Trip ID should be greater than 0.');
    req.asyncValidationErrors()
      .then(next)
      .catch(errors => res.status(400).json({
        status: 'error',
        error: errors.map(err => err.msg),
      }));
  }

  static viewTrips(req, res, next) {
    req.checkQuery('destination').optional()
      .isLength({ min: 1 })
      .withMessage('Destination should have more than one character.')
      .matches(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)
      .withMessage('Destination does not match.');
    req.checkQuery('origin').optional()
      .isLength({ min: 1 })
      .withMessage('Origin should have more than one character.')
      .matches(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)
      .withMessage('Origin does not match.');
    req.asyncValidationErrors()
      .then(next)
      .catch(errors => res.status(400).json({
        status: 'error',
        error: errors.map(err => err.msg),
      }));
  }
}
