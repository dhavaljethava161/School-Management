import { model } from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const create = async (req, res) => {
  try {
    if (req?.body?.userType === "principle") {
      res.send({
        status: 400,
        message: "You are'nt authorised to make principle",
      });
    } else {
      const { email, userType } = req?.body;
      const matchUser = await model.User.findOne({ email, userType });
      if (matchUser) res.send("teacher already exists");
      else {
        const resData = await model.User.create(req?.body);
        res.send({ status: 200, result: resData });
      }
    }
  } catch (error) {
    res.send({ status: 400, err: err.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req?.body;
  try {
    const user = await model.User.findOne({ email });
    if (!user) res.send("user not found");
    else {
      const matchPass = bcrypt.compare(password, user?.password);
      if (!matchPass) res.send("password does'nt matched");
      else {
        const token = jwt.sign(
          { email: user.email, userType: user.userType },
          process.env.AUTH_KEY
        );
        res.send({ status: 200, result: { user, token } });
      }
    }
  } catch (err) {
    res.send({ status: 400, err: err.message });
  }
};

export const update = async (req, res) => {
  const { userType, email } = req?.loginUser;
  const newUserType = req?.body?.userType;
  try {
    if (newUserType === "principle") res.send("invalid userType");
    else {
      const data = await model.User.findOneAndUpdate({ email, userType });
      res.send({ status: 200, result: data });
    }
  } catch (err) {
    res.send({ status: 400, error: error.message });
  }
};
