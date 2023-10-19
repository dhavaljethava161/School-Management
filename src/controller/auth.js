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
  const { email, password } = req?.body;
  try {
    const user = await models.User.findOne({
      email,
      verified: true,
      isDeleted: false,
    });
    if (!user) res.send("user not found");
    else {
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
    }
  } catch (err) {
    res.send({ status: 400, err: err.message });
  }
};

export const update = async (req, res) => {
  const { userType, email } = req?.loginUser;
  const input = req?.body;

  try {
    const user = await models.User.findOne({ email: input.email });
    if (input.userType === userType) res.send("userType is invalid");

    if (userType === "principle") {

      if (input.email) await userData(input);

      else await userData(req?.loginUser);

    } else if (userType === "teacher") {

      if (input) await userData(input);

      else await userData(req?.loginUser);

    } else if (userType === "student") await userData(req?.loginUser);
    
    async function userData(data) {
      const user = await models.User.findOneAndUpdate(
        { email: data.email, userType: data.userType },
        input,
        { new: true }
      );
      return newData()
        .then((resData) => {
          res.send({ status: 200, resData });
        })
        .catch((err) => {
          res.send({ status: 200, err: err.message });
        });
    }
  } catch (err) {
    res.send({ status: 400, err: err.message });
  }
};

export const Delete = async (req, res) => {
  try {
    const _id = req?.loginUser?._id;
    const user = await models.User.findOne({ _id });
    user.isDeleted = true;
    await user.save();
    res.send({ status: 300, message: `${user.name} is deleted` });
  } catch (error) {
    res.send({ status: 400, err: err.message });
  }
};
