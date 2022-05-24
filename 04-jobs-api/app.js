const express = require("express");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const app = express();
require("dotenv").config();

app.use(express.json());

/* ----------------------------- routes ---------------------------- */

app.get("/", (req, res) => {
  res.send(`
  <div>
  <h1>Welcome to Jobs API</h1>
  <div>
    <a href="/api/v1/users/register">Register User</a>
    <a href="/api/v1/jobs">Get all jobs</a>
  </div>
</div>
`);
});

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
