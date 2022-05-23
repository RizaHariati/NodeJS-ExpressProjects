require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./error/error-handler");
const notFoundMiddleware = require("./error/not-found");
const productRouter = require("./routes/product");

/* -------------------------- middleware -------------------------- */
app.use(express.json());
/* ---------------------------- router ---------------------------- */
app.use("/api/v1/products", productRouter);
app.use(notFoundMiddleware);
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
