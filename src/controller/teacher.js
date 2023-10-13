import { models } from "../models";

export const update = async (req, res) => {
  const { userType, email } = req?.loginUser;
  const newUserType = req?.body?.userType;
  try {
    if (newUserType === "principle") res.send("invalid userType");
    else {
      const data = await models.User.findOneAndUpdate({ email, userType });
      res.send({ status: 200, result: data });
    }
  } catch (err) {
    res.send({ status: 400, error: error.message });
  }
};

export const verified = async (req, res) => {
  try {
    const { email, verified } = req?.body;
    const user = await models.User.findOne({ email });
    if (verified === "teacher") req.send("Invalid user");

    user.verified = verified;
    await user.save();
    res.send({ status: 200, result: user });
  } catch (err) {
    res.send({ status: 400, err: err.message });
  }
};
