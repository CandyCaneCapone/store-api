const Products = require("../products");
const NotFoundError = require("../errors/not-found-error");


const getAllTasks = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const getSingleTask = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Products.findById(productId);
    if (!product) {
      throw new NotFoundError(`no product found with ${productId}`);
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    await Products.create(req.body);
    res.status(201).json({ status: 201, message: "product created" });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const newProduct = await Products.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!newProduct) {
      throw new NotFoundError(`no product found with ${productId}`);
    }

    res.json(newProduct);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Products.findByIdAndDelete(productId);

    if (!product) {
      throw new NotFoundError(`no product found with ${productId}`);
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};


module.exports = {
    getAllTasks , 
    getSingleTask , 
    createTask , 
    updateTask , 
    deleteTask

}