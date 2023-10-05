import express from "express";
import { create, signin, update } from "../controller/teacher";

const teacherRouter = express.Router();

teacherRouter.post("/create", create); //teacher can create their profile
teacherRouter.get("/signin", signin); // teacher can signin into their profile
teacherRouter.put("/update", update); // teacher can update student data and their data

export default teacherRouter;
