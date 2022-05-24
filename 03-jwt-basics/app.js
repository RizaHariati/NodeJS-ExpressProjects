const express = require("express");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const app = express();
const mainRouter = require("./routes/main");

app.use(express.static("./public"));

app.use(express.json());

app.use("/api/v1", mainRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = 3000;
const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
