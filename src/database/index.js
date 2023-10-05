import mongoose from "mongoose";

export const dbConnection = () => {
  console.log("connection has started...");
  mongoose
    .connect(process.env.DB_URL)
    .then((res) => {
      console.log("Your database has been connected now...");
    })
    .catch((err) => {
      console.log("Your database has been thrown err", err);
    });
};
