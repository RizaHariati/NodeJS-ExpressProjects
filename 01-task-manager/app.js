require("dotenv").config();
const express = require("express");
const app = express();
const taskRouter = require("./routes/task");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

/* -------------------------- middleware -------------------------- */
app.use(express.static("./public/"));
app.use(express.json());

/* ---------------------------- router ---------------------------- */
app.use("/api/v1/tasks", taskRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
