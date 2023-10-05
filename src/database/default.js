import { models } from "../models";

export async function admin() {
  try {
    const findPrinciple = await models.User.findOne({
      email: process.env.PRINCIPLE_MAIL,
    });
    if (!findPrinciple) {
      models.User.create({
        email: process.env.PRINCIPLE_MAIL,
        password: process.env.PRINCIPLE_PASS,
        number: process.env.PRINCIPLE_NUM,
        userType: "principle",
      });
      console.log("Principle created...!");
    }
  } catch (error) {
    console.log(error.message);
  }
}
