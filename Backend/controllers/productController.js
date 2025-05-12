const productModel = require("../models/productModel");

//Get Products API - /api/v1/products
exports.getProducts = async (req, res, next) => {
  const products = await productModel.find({});

  res.json({
    success: true,
    products,
    message: "Get all products working!",
  });
};

//Get Single Product API - /api/v1/products/:id
exports.getSingleProducts = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);

    res.json({
      success: true,
      product,
      message: "Get single product working!",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
