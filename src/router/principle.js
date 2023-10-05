import express from "express";
import {
  signin,
  create,
  update,
  getByUserType,
  getFees,
  getSalary,
} from "../controller/principle";
import { principleAuth } from "../authentication/auth";

const principleRouter = express.Router();

principleRouter.get("/signin", signin); // principle can signIn by principle password and email
principleRouter.post("/create", principleAuth, create); //principle can create teacher and student but principle can't create themself because if principle is not in database then it'll be created automatically and principle have to signin during creating student or teacher
principleRouter.put("/update/:id", principleAuth, update); // principle can any users's data by their userId
principleRouter.get("/getfees", principleAuth, getFees); // principle can see which student have paid their fees
principleRouter.get("/getsalary", getSalary);
principleRouter.get("/user", principleAuth, getByUserType);

export default principleRouter;
