require("dotenv").config();
const Product = require("./models/product");
const productsjson = require("./products.json");
const populate = async () => {
  try {
    console.log("repopulate database...");
    await Product.deleteMany();
    await Product.create(productsjson);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populate();
