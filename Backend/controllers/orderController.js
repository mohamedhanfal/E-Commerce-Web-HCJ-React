const orderModel = require("../models/orderModel");

//Create Order - /api/v1/order
exports.createOrder = async (req, res, next) => {
  const cartItems = req.body;
  const amount = Number(
    cartItems
      .reduce((acc, item) => {
        return acc + Number(item.product.price) * item.qty;
      }, 0)
      .toFixed(2)
  );
  const status = "Pending";

  const order = await orderModel.create({
    cartItems,
    amount,
    status,
    createdAt: new Date(),
  });

  res.json({
    success: true,
    order,
  });
};
