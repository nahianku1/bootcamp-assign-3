import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { globalErrorhandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import { router } from "./app/routes";
import cookieParser from "cookie-parser";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerSpec = YAML.load(path.join(__dirname, "api.yml"));

const app: Application = express();
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
dotenv.config();

app.use(express.static(path.join(__dirname, "swagger-ui-dist")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send(`Server working Again after!`);
});

app.use("/api", router);

app.use(notFound);
app.use(globalErrorhandler);
export default app;
