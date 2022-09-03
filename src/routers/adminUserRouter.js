import express from "express";
import { comparePassword, hashPassword } from "../helpers/bcryptHelper.js";
import {
  emailVerificationValidation,
  loginValidation,
  newAdminUserValidation,
} from "../middlewares/joi-validation/joiValidation.js";
import {
  findOneAdminUser,
  insertAdminUser,
  updateOneAdminUser,
} from "../model/adminUser/AdminUserModel.js";
import { v4 as uuidv4 } from "uuid";
import {
  verificationEmail,
  verificationNotification,
} from "../helpers/emailHelper.js";
import { callBothFunction } from "../helpers/jsonWebToken.js";

// server side validation -- install joi for server side validation
// encrypt user password --- install bcrypt.js from npm
// insert into the db
// create unique verification code
// send create a link pointing to our frontend with email and verification code and send to their email
// --to send email just install nodemailer

const router = express.Router();

router.post("/", newAdminUserValidation, async (req, res, next) => {
  try {
    const { password } = req.body;
    // just overriding the password
    req.body.password = hashPassword(password);
    // just adding enaother object in the object req.body
    req.body.emailValidationCode = uuidv4();
    const user = await insertAdminUser(req.body);
    if (user?._id) {
      res.json({
        status: "success",
        message:
          "We have sent you an email to verify your account, please check your email box including junk folder",
      });
      const url = `${process.env.ROOT_DOMAIN}/admin/verify-email?c=${user.emailValidationCode}&e=${user.email}`;
      verificationEmail({
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        url,
      });
      // send email
      return;
    }
    res.json({
      status: "error",
      message: "Unable to create a new user, try again later",
    });
  } catch (error) {
    //   Only if you have decalred global error handler
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message =
        "There is already another user uses this email, either reset password or use different email.";
    }
    next(error);
  }
});

router.patch(
  "/verify-email",
  emailVerificationValidation,
  async (req, res, next) => {
    try {
      const { emailValidationCode, email } = req.body;
      const user = await updateOneAdminUser(
        { emailValidationCode, email },
        { status: "active", emailValidationCode: "" }
      );
      user?._id
        ? res.json({
            status: "success",
            message: "Your account has been verified, you may login in now.",
          }) && verificationNotification(user)
        : res.json({
            status: "error",
            message: "Invalid or expired link, no action was taken",
          });
    } catch (error) {
      //   Only if you have decalred global error handler
      next(error);
    }
  }
);

router.post("/login", loginValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // find if user exist based on given email
    const user = await findOneAdminUser({ email });

    if (user?._id) {
      // We need to verify if the password send by the user and the hash password store in our db is the same
      if (user?.status !== "active") {
        return res.json({
          status: "error",
          message:
            "Your account has not been verfied, please check yoour email and verify your account",
        });
      }
      const isMatched = comparePassword(password, user.password);
      if (isMatched) {
        user.password = undefined;
        // jwts
        const jwts = await callBothFunction({ email });
        return res.json({
          status: "success",
          message: "Logged in successfully",
          user,
          ...jwts,
        });
      }
    }

    res.json({
      status: "error",
      message: "Invalid login credintials",
      user,
    });
  } catch (error) {
    //   Only if you have decalred global error handler
    next(error);
  }
});

export default router;
