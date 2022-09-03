import Joi from "joi";

export const newAdminUserValidation = (req, res, next) => {
  try {
    // define rules
    const schema = Joi.object({
      fName: Joi.string().max(20).required(),
      lName: Joi.string().max(20).required(),
      email: Joi.string().email({ minDomainSegments: 2 }),
      password: Joi.string().max(100).required(),
      phone: Joi.string().max(100).required(),
      address: Joi.string().max(100).allow("", null),
      dob: Joi.date().allow("", null),
    });
    // give data to the rules

    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 200;
      return next(error);
    }
    // so that if there is no error we will send this data to the next middle ware which is async await
    next();
  } catch (error) {
    next(error);
  }
};

export const emailVerificationValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      emailValidationCode: Joi.string().max(100).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 200;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const loginValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      password: Joi.string().max(100).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 200;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const categoryValidation = (req, res, next) => {
  try {
    req.body.parentId = req.body.parentId ? req.body.parentId : null;
    const schema = Joi.object({
      status: Joi.string().max(10),
      name: Joi.string().max(100).required(),
      parentId: Joi.string().max(100).allow(null, ""),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 200;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
