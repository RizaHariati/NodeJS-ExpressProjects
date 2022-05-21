require("dotenv").config();
const express = require("express");
const { StatusCodes } = require("http-status-codes");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const taskRouter = require("./routes/task");

const app = express();

app.use(express.static("./public/"));

/* -------------------------- middleware -------------------------- */
app.use(express.json());

/* ---------------------------- router ---------------------------- */
app.use("/api/v1/tasks", taskRouter);
app.use(errorHandlerMiddleware);
app.get("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "Page not found" });
});

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
