import { models } from "../models";

// TODO make all in one update for all roles(principle,student,teacher)

export const update = async (req, res) => {
  // TODO if user is student then update data by login user id other wise if lodgin use is admin then take id frm params
  const { email, userType } = req?.loginUser;
  const newUserType = req?.body?.userType;
  try {
    // delete req?.body?.userType;
    if (newUserType === userType) res.send("userType is invalid");
    else {
      await models.User.findOneAndUpdate({ email, userType }, req?.body, {
        new: true,
      })
        .then((resData) => res.send({ status: 200, result: resData }))
        .catch((err) => res.send({ status: 400, err: err.message }));
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
    if (!student) throw new Error("studentId not found...");
    w;

    student.totalPaidFees += installmentAmount;

    const fee = await models.Fees.create({
      student: studentId,
      amount: student.totalPaidFees,
      paymentDate: new Date(),
      description,
    });

    await student.save();

    res.send({ status: 200, result: fee });
  } catch (err) {
    res.send({ status: 400, err: err.message });
  }
};
