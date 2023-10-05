import jwt from "jsonwebtoken";
import { models } from "../models";

export const create = (req, res) => {
  models.User.create(req?.body)
    .then((resData) => {
      res.send({ status: 200, result: resData });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};

export const signin = async (req, res) => {
  let email = req?.body?.email;
  await models.User.findOne({ email })
    .then((resData) => {
      let token = jwt.sign(
        { email: resData.email, userType: resData.userType },
        process.env.AUTH_KEY
      );
      res.send({ status: 200, result: resData, token });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};

export const update = async (req, res) => {
  try {
    // const { id, userType } = req?.loginUser;
    const { id } = req?.params;
    const newData = await models.User.findByIdAndUpdate(
      { _id: id, userType: req?.body?.userType },
      req?.body,
      { new: true }
    );
    res.send({ status: 200, result: newData });
  } catch (err) {
    res.send({ status: 400, err: err.message });
  }
};

export const getByUserType = async (req, res) => {
  try {
    const data = await models.User.find(
      { userType: req.body.userType },
      { name: 1, email: 1, userType: 1 }
    );
    res.send({ status: 200, result: data });
  } catch (err) {
    res.send({ status: 400, err: err.message });
  }
};

export const getFees = async (req, res) => {
  try {
    const data = await models.User.find(
      { userType: "student", totalPaidFees: { $gt: 0 } },
      { totalPaidFees: 1, name: 1 }
    );
    res.send({ status: 200, result: data });
  } catch (err) {
    res.send({ status: 400, err: err.message });
  }
};

export const getSalary = async (req, res) => {
  try {
    const data = await models.User.find(
      { userType: "teacher", salary: { $gt: 0 } },
      { salary: 1, name: 1 }
    );
    res.send({ status: 200, result: data });
  } catch (err) {
    res.send({ status: 400, err: err.message });
  }
};
