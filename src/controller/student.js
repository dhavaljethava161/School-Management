import { models } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
  try {
    if (req?.body?.userType === "teacher")
      res.send("you are'nt authorised to create teacher");
    else if (req?.body?.userType === "principle")
      res.send("you are'nt authorised to create principle");
    else {
      const { email, userType } = req?.body;
      const matchUser = await models.User.findOne({ email, userType });
      if (matchUser)
        res.send({ status: 400, message: "student is already exists" });
      else {
        const studentCreate = await models.User.create(req?.body);
        res.send({ status: 200, result: studentCreate });
      }
    }
  } catch (error) {
    res.send({ status: 400, err: error.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req?.body;
  const matchUser = await models.User.findOne({ email });

  if (!matchUser) res.send({ status: 400, message: "user not found" });
  else {
    const matchPass = bcrypt.compare(password, matchUser.password);
    if (!matchPass)
      res.send({ status: 400, message: "password does'nt matched" });
    else {
      const resData = req?.body;
      const token = jwt.sign(
        { email, userType: matchUser.userType },
        process.env.AUTH_KEY
      );
      res.send({ status: 200, result: { resData, token } });
    }
  }
};

export const update = async (req, res) => {
  // TODO if user is student then update data by login user id other wise if lodgin use is admin then take id frm params
  const { email, userType } = req?.loginUser;
  const newUserType = req?.body?.userType;
  try {
    if (newUserType === "teacher") res.send("userType is invalid");
    else if (newUserType === "principle") res.send("userType is invalid");
    else {
      const resData = await models.User.findOneAndUpdate(
        { email, userType },
        req?.body,
        { new: true }
      );
      res.send({ status: 200, result: resData });
    }
  } catch (err) {
    res.send({ status: 400, err: err.message });
  }
};

export const Delete = async (req, res) => {
  const { email } = req?.body; // TODO have to use delete by id not email and aslo implement authentcate of teacher
  await models.User.findOneAndRemove(email)
    .then((resData) => {
      res.send({ status: 200, message: "student has been removed" });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};

// we have assume in this project that student can pay their fees directly
export const createFeesRecord = async (req, res) => {
  try {
    const { studentId, installmentAmount, description } = req?.body;

    const student = await models.User.findById(studentId);

    student.totalPaidFees += installmentAmount;

    const fee = new models.Fees({
      student: studentId,
      amount: student.totalPaidFees,
      paymentDate: new Date(),
      description,
    });

    await student.save(), fee.save();

    if (!student) throw new Error("studentId not found...");

    res.send({ status: 200, result: fee });
  } catch (err) {
    res.send({ status: 400, err: err.message });
  }
};
