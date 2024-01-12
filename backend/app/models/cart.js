/*
CartItem Model:
Fields: cart_id, user_id, isbn,price, quantity, total_price
Purpose: Represents items added to the shopping cart, including the book and the quantity selected.

*/
let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartItemSchema = new Schema(
  {
    cart_id: {
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
    isbn: {
      type: String,
      required: "ISBN is required",
    },
    price: {
      type: Number,
      required: "Price is required",
    },
    quantity: {
      type: Number,
      required: "Quantity is required",
      min: [1, "Quantity can not be less than 1"],
    },
    total_price: {
      type: Number,
      required: "Total price is required",
    },
  },
  {
    collection: "cartItems",
    timestamps: true,
  }
);

// Virtual for calculating total price based on price and quantity
CartItemSchema.virtual("calculateTotal").get(function () {
  return this.price * this.quantity;
});

// Ensure that the total_price is set correctly before saving
CartItemSchema.pre("save", function (next) {
  this.total_price = this.calculateTotal;
  next();
});

module.exports = mongoose.model("CartItem", CartItemSchema);
