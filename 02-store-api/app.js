require("dotenv").config();

const express = require("express");
const { StatusCodes } = require("http-status-codes");
const app = express();

const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");

const productRouter = require("./routes/product");

// require("./populate");
/* -------------------------- middleware -------------------------- */
app.use(express.json());
/* ---------------------------- router ---------------------------- */
app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send(
    `<div><h1>Store API</h1>
    <a href="/api/v1/products/">get all products</a>
    <a href="/api/v1/products/static">products static</a>
    </div>`
  );
});
app.use("/api/v1/products", productRouter);
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

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
