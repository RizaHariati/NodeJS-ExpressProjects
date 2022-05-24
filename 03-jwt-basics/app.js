const express = require("express");
const app = express();
const mainRouter = require("./routes/main");

app.use(express.static("./public"));

app.use(express.json());
const errorHandlerMiddleware = require("./middleware/error-handler");

app.get("/", (req, res) => {
  res.send(
    '<h1>Welcome to Store API</h1><a href="/api/v1/products">products route</a>'
  );
});
app.use("/api/v1/products", mainRouter);
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
