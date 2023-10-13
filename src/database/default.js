import { models } from "../models";
import { config } from "../config";

export async function admin() {
  try {
    await models.User.updateOne(
      { email: process.env.PRINCIPLE_MAIL },
      {
        $set: {
          email: config.admin_cred.PRINCIPLE_MAIL,
          password: config.admin_cred.PRINCIPLE_PASS,
          number: config.admin_cred.PRINCIPLE_NUM,
          userType: "principle",
          verified: true,
        },
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.log(error.message);
  }
}
