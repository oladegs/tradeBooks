let Order = require("../models/order");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { user_id, status, total_price } = req.body;
    const newOrder = new Order({
      user_id,
      status,
      total_price,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

// Retrieve all orders for a user
exports.getUserOrders = async (req, res) => {
  try {
    const { user_id } = req.params;
    const userOrders = await Order.find({ user_id });
    res.status(200).json(userOrders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

// Update an order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      order_id,
      { status },
      { new: true }
    );

    if (updatedOrder) {
      res
        .status(200)
        .json({
          message: "Order status updated successfully",
          order: updatedOrder,
        });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order status", error: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(order_id);

    if (deletedOrder) {
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting order", error: error.message });
  }
};

// Find an order by ID
exports.findOrderById = async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await Order.findById(order_id);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding order", error: error.message });
  }
};
