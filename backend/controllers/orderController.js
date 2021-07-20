import {createOrder, getOrderById} from "../config/db_sqlite.js";
import asyncHandler from "express-async-handler";

// @desc Create new order
// @route POST /api/orders
// @access private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    //return;
  } else {

    //Parsing the incoming order
    var order = {
      user: req.user._id.toString(),
      shippingAddress: JSON.stringify(shippingAddress),
      paymentMethod: paymentMethod,
      itemsPrice: itemsPrice,
      taxPrice: taxPrice,
      shippingPrice: shippingPrice,
      totalPrice: totalPrice,
      orderItems: JSON.stringify(req.body.orderItems)
    };

    createOrder(order, function(orderDB){

      /* var items = orderDB.orderItems.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
      items = items.replace(/'/g, '"'); */

      orderDB.orderItems = JSON.parse(orderDB.orderItems);
      orderDB.shippingAddress = JSON.parse(orderDB.shippingAddress);

      res.status(201).json(orderDB);
    })

    //const createdOrder = await order.save();
  }
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrder = asyncHandler(async (req, res) => {
  /* const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); */

  getOrderById(req.params.id, function(orderDB){
    if (orderDB) {
      
      orderDB.orderItems = JSON.parse(orderDB.orderItems);
      orderDB.shippingAddress = JSON.parse(orderDB.shippingAddress);

      res.send(orderDB);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
});

export { addOrderItems, getOrder };


/* import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

// @desc Create new order
// @route POST /api/orders
// @access private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.send(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export { addOrderItems, getOrderById };
 */