import { models } from "../models";
import { config } from "../config";
import bcrypt from "bcrypt";

export async function admin() {
  try {
    await models.User.updateOne(
      { email: config.admin_cred.PRINCIPLE_MAIL },
      {
        $set: {
          email: config.admin_cred.PRINCIPLE_MAIL,
          password: await bcrypt.hash(config.admin_cred.PRINCIPLE_PASS, 12),
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
