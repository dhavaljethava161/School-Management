import express from "express";
import { Delete, createFeesRecord, update } from "../controller/student";
import { checkAuth } from "../authentication/auth";

const studentRouter = express.Router();

studentRouter.get("/createfees", checkAuth, createFeesRecord); // update totalPaidFees

export default studentRouter;
