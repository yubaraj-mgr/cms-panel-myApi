import jwt from "jsonwebtoken";
import { updateOneAdminUser } from "../model/adminUser/AdminUserModel.js";
import { insertSession } from "../model/session/sessionModel.js";

export const signAccessJwt = async (payload) => {
  const signToken = jwt.sign(payload, process.env.SIGN_ACCESS_JWT, {
    expiresIn: "15m",
  });
  const obj = {
    token: signToken,
    type: "jwt",
  };
  await insertSession(obj);
  return signToken;
};

export const refreshAccessJwt = async (payload) => {
  const refreshJwt = jwt.sign(payload, process.env.REFRESH_ACCESS_JWT, {
    expiresIn: "30d",
  });
  await updateOneAdminUser(payload, { refreshJwt });
  return refreshJwt;
};

export const callBothFunction = async (payload) => {
  return {
    signToken: await signAccessJwt(payload),
    refreshJwt: await refreshAccessJwt(payload),
  };
};
