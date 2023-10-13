import { checkAuth } from "../authentication/auth";
import { create, signin, update } from "../controller/auth";
import express from "express";

const authRouter = express.Router();

authRouter.post("/create", create);
authRouter.get("/signin", signin);
authRouter.put("/update", checkAuth, update);
authRouter.put("/delete");

export default authRouter;
