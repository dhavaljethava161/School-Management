import express from "express";
import "dotenv/config";
import { routes } from "./router";
import { dbConnection } from "./database";
import { config } from "./config";

const app = express();
const port = config.port || 1000;
app.use(express.json());

app.use("/", routes.authRouter);
app.use("/principle", routes.principleRouter);
app.use("/student", routes.studentRouter);
app.use("/teacher", routes.teacherRouter);

app.listen(port, () => {
  dbConnection();
  console.log(`your server is running at http://localhost:${port}`);
});
