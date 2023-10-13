import jwt from "jsonwebtoken";
import { models } from "../models";

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
