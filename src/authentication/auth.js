import jwt from "jsonwebtoken";
import { models } from "../models";

export const studentAuth = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")?.[1];

    const data = jwt.verify(token, process.env.AUTH_KEY);

    const userData = await models.User.findOne({
      email: data.email,
      userType: data.userType,
    });

    req.loginUser = userData;

    if (data) next();
    else res.send({ status: 400, err: "Please sign in first" });
  } catch (error) {
    res.send({ status: 400, error: error.message });
  }
};
//TODO make common auth for principle and teacher for get fees
export const teacherAuth = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")?.[1];

  const data = jwt.verify(token, process.env.AUTH_KEY);
  if (!data) res.send("Please signIn first");

  const userData = await models.User.findOne({
    email: data.email,
    userType: data.userType,
  });

  req.loginUser = userData;
  if (data.userType !== "teacher") res.send("You are'nt Teacher");
  else next();
};

export const principleAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const data = jwt.verify(token, process.env.AUTH_KEY);
    if (!data) res.send("Please signIn first");

    const userData = await models.User.findOne({ email: data.email });
    req.loginUser = userData;
    if (userData.userType !== "principle") res.send("You are'nt principle");
    else next();
  } catch (error) {
    res.send({ status: 400, error: error.message });
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const data = jwt.verify(token, process.env.AUTH_KEY);
    if (!data) res.send("Please signIn first");

    const userData = await models.User.findOne({ email: data.email });
    req.loginUser = userData;
    next();
  } catch (error) {
    res.send({ status: 400, error: error.message });
  }
};
