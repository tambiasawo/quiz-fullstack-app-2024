import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import dbConnect from "./utils/dbConnect";
import errorHandler from "./utils/errorHandler";
import cookieParser from "cookie-parser";
import mainRouter from "./routes";
import path from "path";

dbConnect();

const PORT = 3000;
const app = express();
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));

app.use(
  cors({
    origin: "*",  // this enables your api endpoint to be accessible from any origin. So ur api endpoint in your code should be /api/....
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(`/api`, mainRouter);

app.use(errorHandler);

app.use("*", (req, res) => {
  //route that doenst match our provided routes
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

export default app;
