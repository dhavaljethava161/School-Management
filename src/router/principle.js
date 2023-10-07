import express from "express";
import {
  update,
  getByUserType,
  getFees,
  getSalary,
  verified,
  paySalary,
} from "../controller/principle";
import { principleAuth, teacherAuth } from "../authentication/auth";

const principleRouter = express.Router();

//principle can verifies the student and teacher so that can login even if somebody know the url and create the profile in our website till principle has'nt verified the profile they can't login

// what if student count is too much high so that's why we have made api for teacher also so from teachers can verify students only

principleRouter.put("/verified", verified);
principleRouter.put("/update/:id", principleAuth, update); // principle can any users's data by their userId
principleRouter.get("/getfees", principleAuth, teacherAuth, getFees); // principle can see which student have paid their fees
principleRouter.get("/getsalary", getSalary);
principleRouter.get("/user", principleAuth, getByUserType);
principleRouter.put("/paysalary", paySalary);

export default principleRouter;
