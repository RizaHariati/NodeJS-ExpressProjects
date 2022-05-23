const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");

const getAllProductStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ total: products.length, products });
};

const getAllProduct = async (req, res) => {
  const { name, featured, company, sort, fields } = req.query;
  let queryObjects = {};
  if (name) {
    queryObjects.name = { $regex: name, $options: "i" };
  }
  if (featured) {
    queryObjects.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObjects.company = company;
  }

  let result = Product.find(queryObjects);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(StatusCodes.ACCEPTED).json({ total: products.length, products });
};

module.exports = { getAllProductStatic, getAllProduct };
