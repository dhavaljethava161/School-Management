import { checkAuth } from "../authentication/auth";
import { Delete, create, signin, update } from "../controller/auth";
import express from "express";

const authRouter = express.Router();

authRouter.post("/create", create);
authRouter.get("/signin", signin);
authRouter.put("/update", checkAuth, update);
authRouter.put("/delete", checkAuth, Delete);

export default authRouter;
