const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../error/custom-error");
const BadRequestError = require("../error/bad-request");

const getAllProductStatic = async (req, res, next) => {
  try {
    const products = await Product.find({});

    if (!products) {
      const error = new BadRequestError(
        " can't find product with that keyword "
      );
      next(error);
    }
  } catch (error) {
    next(error);
  }
  res.status(StatusCodes.OK).json({ total: products.length, products });
};

const getAllProduct = async (req, res, next) => {
  try {
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
    if (!products || products.length < 1) {
      const error = new BadRequestError("Product is not found");
      return next(error);
    }
    res.status(StatusCodes.ACCEPTED).json({ total: products.length, products });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllProductStatic, getAllProduct };
