import express from "express";
import { Delete, createFeesRecord, update } from "../controller/student";
import { checkAuth } from "../authentication/auth";

const studentRouter = express.Router();

studentRouter.get("/createfees", checkAuth, createFeesRecord); // update totalPaidFees

studentRouter.delete("/delete", Delete); // student can remove student from database

export default studentRouter;
