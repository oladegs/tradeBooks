/*
Order Model:

Fields: order_id, user_id, status, order_date, total_price
Purpose: Represents orders placed by users, tracks order status, and calculates the total price of an order.
*/
let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    order_id: {
      type: mongoose.Types.ObjectId, 
      index: true,
      required: true,
      auto: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId, 
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refunded"], 
      default: "pending",
      required: true,
    },
    order_date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "orders", 
    timestamps: { createdAt: "order_date", updatedAt: false },
  }
);

module.exports = mongoose.model("Order", OrderSchema);
