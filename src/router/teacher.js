import express from "express";
import { update, verified } from "../controller/teacher";
const teacherRouter = express.Router();

teacherRouter.put("/verified", verified);
teacherRouter.put("/update", update); // teacher can update student data and their data

export default teacherRouter;
