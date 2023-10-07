import { models } from "../models";
import { config } from "../config";

export async function admin() {
  try {
    const findPrinciple = await models.User.findOne({
      email: process.env.PRINCIPLE_MAIL,
    });
    if (!findPrinciple) {
      models.User.create({
        email: config.admin_cred.PRINCIPLE_MAIL,
        password: config.admin_cred.PRINCIPLE_PASS,
        number: config.admin_cred.PRINCIPLE_NUM,
        userType: "principle",
      });
      console.log("Principle created...!");
    }
  } catch (error) {
    console.log(error.message);
  }
}
