const Products = require("../models/products");
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");
const asyncWrapper = require("../utils/async-wrapper");

const getAllTasks = asyncWrapper(async (req, res, next) => {
  const { featured, brand, name, sort, fields, limit, page } = req.query;
  const queryObject = {};

  // search
  if (featured) queryObject.featured = featured === "true" ? true : false;
  if (brand) queryObject.brand = brand;
  if (name) queryObject.name = { $regex: name, $options: "i" };

  // sorting
  let result = Products.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  // pagination
  const limitNumber = parseInt(limit) || 10;
  const pageNumber = parseInt(page) || 1;
  const skip = (pageNumber - 1) * limit;

  const products = await result.skip(skip).limit(limitNumber);
  res.json(products);
});

const getSingleTask = asyncWrapper(async (req, res, next) => {
  const productId = req.params.id;
  const product = await Products.findById(productId);
  if (!product) {
    throw new NotFoundError(`no product found with ${productId}`);
  }
  res.json(product);
});

const createTask = asyncWrapper(async (req, res, next) => {
  await Products.create(req.body);
  res.status(201).json({ status: 201, message: "product created" });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const productId = req.params.id;

  if (Object.keys(req.body).length === 0) {
    throw new BadRequestError("Please provide a field to update");
  }

  const newProduct = await Products.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!newProduct) {
    throw new NotFoundError(`no product found with ${productId}`);
  }

  res.json(newProduct);
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const productId = req.params.id;
  const product = await Products.findByIdAndDelete(productId);

  if (!product) {
    throw new NotFoundError(`no product found with ${productId}`);
  }
  res.json(product);
});

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
