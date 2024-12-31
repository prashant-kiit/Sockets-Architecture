import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import { Worker } from "node:worker_threads";

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// database
const database = [];

// create data
app.post("/create", async (req, res) => {
  await delay(5000);
  database.push(req.body.data);
  res.json({ message: "Data inserted with Database " + database.join(", ") });
});

// API
app.get("/api/:data", async (req, res) => {
  await delay(5000);
  console.log(req.params);
  const data = database.find((item) => item === req.params.data);
  res.json({ message: "Welcome to the API with data " + data });
});

// short-poll
app.get("/short-poll/:data", async (req, res) => {
  await delay(5000);
  const data = database.find((item) => item === req.params.data);
  res.json({ message: "Welcome to the Short Poll with data " + data });
});

// long-poll
app.get("/long-poll/:data", async (req, res) => {
  while (true) {
    await delay(5000);
    const data = database.find((item) => item === req.params.data);
    if (data) {
      res.json({ message: "Welcome to the Long Poll with data " + data });
      break;
    }
    console.log("Waiting for data...");
  }
});

// hook
app.get("/do-big-compute", (req, res) => {
  new Worker("./src/worker.js");
  res.json({ message: "Welcome to the Hook. Big Compute Started" });
});

app.get("/hook", (req, res) => {
  database.push("Done");
  res.json({ message: "Welcome to the Hook. Big Compute Done" });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
