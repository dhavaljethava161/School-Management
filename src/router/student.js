import express from "express";
import { Delete, createFeesRecord, update } from "../controller/student";
import { studentAuth } from "../authentication/auth";

const studentRouter = express.Router();

studentRouter.get("/createfees", studentAuth, createFeesRecord); // update totalPaidFees

studentRouter.put("/update", studentAuth, update); // student can update only student data

studentRouter.delete("/delete", Delete); // student can remove student from database

export default studentRouter;
