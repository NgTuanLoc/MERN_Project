import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @DESC Create New Order
// @ROUTE api/orders
// @ACCESS Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    tax,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      tax,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(200).json(createdOrder);
  }
});

// @DESC Get User By ID
// @ROUTE api/orders/:id
// @ACCESS Private
const getOrderByID = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
     "user", "name email" 
    );
    console.log(order);
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order Not Found !");
    }
  } catch (error) {
    res.status(404)
    throw new Error ("Order Not Found !")
  }
});

export { addOrderItems, getOrderByID };
