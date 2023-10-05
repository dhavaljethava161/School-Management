import express from "express";
import {
  Delete,
  create,
  createFeesRecord,
  signin,
  update,
} from "../controller/student";
import { studentAuth } from "../authentication/auth";

const studentRouter = express.Router();

studentRouter.post("/create", create); // create student

studentRouter.get("/signin", signin);

studentRouter.get("/createfees", studentAuth, createFeesRecord); // update totalPaidFees

studentRouter.put("/update", studentAuth, update); // student can update only student data

studentRouter.delete("/delete", Delete); // student can remove student from database

export default studentRouter;
