import { config } from "../config";
import { models } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
  try {
    const { email, userType } = req?.body;
    const user = await models.User.findOne({ email });

    if (userType === "principle") res.send("userType is invalid");
    else if (user) res.send("user is already exists");
    else {
      await models.User.create(req?.body);

      await models.User.findOne({ email }, { totalPaidFees: 0, salary: 0 })
        .then((resData) => {
          res.send({ status: 200, result: resData });
        })
        .catch((err) => {
          res.send({ status: 400, err: err.message });
        });
    }
  } catch (err) {
    res.send({ status: 400, err: err.message });
  }
};

export const signin = async (req, res) => {
  console.log("====>");
  const { email, password } = req?.body;
  try {
    const user = await models.User.findOne(
      { email },
      { totalPaidFees: 0, salary: 0 }
    );
    const matchPass = await bcrypt.compare(password, user?.password);
    if (user.verified === false || !matchPass || !user)
      res.send("user and password does not matched");
    else {
      const token = jwt.sign(
        { email: user.email, userType: user.userType },
        config.secret_key
      );
      res.send({ status: 200, result: { user, token } });
    }
  } catch (err) {
    res.send({ status: 400, err: err.message });
  }
};

export const update = async (req, res) => {
  const { email, userType } = req?.loginUser;
  const input = req?.body;
  try {
    async function userData(data) {
      const resData = await models.User.findOneAndUpdate(
        { email: data.email, userType: data.userType },
        input,
        {
          new: true,
        }
      );
      return resData;
    }
    async function selfData(data) {
      const resData = await models.User.findOneAndUpdate(
        { email: data.email, userType: data.userType },
        input,
        {
          new: true,
        }
      );
      return resData;
    }
    if (userType === "principle") {
      if (input.email) {
        const resData = await userData(req?.body);
        res.send({ status: 200, result: resData });
      } else {
        const resData = await selfData(req?.loginUser);
        res.send({ status: 200, result: resData });
      }
    } else if (input.userType === userType) res.send("userType is invalid");
    else if (userType === "teacher") {
      if (input) {
        const resData = userData();
        res.send({ status: 200, result: resData });
      } else {
        const resData = selfData();
        res.send({ status: 200, result: resData });
      }
    }
  } catch (err) {
    res.send({ status: 400, err: err.message });
  }
};