import express from "express";
import "dotenv/config";
import { routes } from "./router";
import { dbConnection } from "./database";
import { admin } from "./database/default";

const app = express();
const port = process.env.PORT || 1000;
app.use(express.json());
app.use("/principle", routes.principleRouter);
app.use("/student", routes.studentRouter);
app.use("/teacher", routes.teacherRouter);

app.listen(port, () => {
  dbConnection();
  admin();
  console.log(`your server is running at http://localhost:${port}`);
});
