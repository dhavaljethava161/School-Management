import { models } from "../models";

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
      { userType: req.body.userType, verified: true },
      { name: 1, email: 1, userType: 1 }
    );
    console.log("data===>", data);

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

export const paySalary = async (req, res) => {
  try {
    const { paid, email } = req?.body;
    const user = await models.User.findOne({ email });
    user.salary += paid;
    user.save();
    res.send({
      status: 200,
      message: `salary has been paid ${user.salary}`,
    });
  } catch (err) {}
};

export const verified = async (req, res) => {
  try {
    const { email, verified } = req?.body;
    const user = await models.User.findOne({ email });
    user.verified = verified;

    res.send({ status: 200, result: user });
  } catch (err) {
    res.send({ status: 400, err: err.message });
  }
};
