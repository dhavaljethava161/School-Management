import mongoose from "mongoose";
import { config } from "../config";
import { admin } from "./default";

export const dbConnection = () => {
  console.log("connection has started...");
  mongoose
    .connect(config.db_url)
    .then((res) => {
      console.log("Your database has been connected now...");
    })
    .catch((err) => {
      console.log("Your database has been thrown err", err);
    });
  admin();
};
