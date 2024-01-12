let CartItem = require("../models/cart");

// Create a new cart item
exports.createCartItem = async (req, res) => {
  try {
    const { user_id, isbn, price, quantity } = req.body;
    const total_price = price * quantity;

    const newCartItem = new CartItem({
      user_id,
      isbn,
      price,
      quantity,
      total_price,
    });

    await newCartItem.save();
    res.status(201).json({
      message: "Cart item created successfully",
      cartItem: newCartItem,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating cart item", error: error.message });
  }
};

// Retrieve all cart items for a user
exports.getCartItems = async (req, res) => {
  try {
    const userCartItems = await CartItem.find({ user_id: req.params.userId });
    res.status(200).json(userCartItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart items", error: error.message });
  }
};

// Update a cart item
exports.updateCartItem = async (req, res) => {
  try {
    const { cart_id } = req.params;
    const { price, quantity } = req.body;
    const total_price = price * quantity;

    const updatedCartItem = await CartItem.findByIdAndUpdate(
      cart_id,
      { price, quantity, total_price },
      { new: true }
    );

    if (updatedCartItem) {
      res.status(200).json({
        message: "Cart item updated successfully",
        cartItem: updatedCartItem,
      });
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating cart item", error: error.message });
  }
};

// Delete a cart item
exports.deleteCartItem = async (req, res) => {
  try {
    const { cart_id } = req.params;
    const deletedCartItem = await CartItem.findByIdAndRemove(cart_id);

    if (deletedCartItem) {
      res.status(200).json({ message: "Cart item deleted successfully" });
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting cart item", error: error.message });
  }
};

// Find a cart item by ID
exports.findCartItem = async (req, res) => {
  try {
    const { cart_id } = req.params;
    console.log("Searching for cart item with ID:", cart_id);
    const cartItem = await CartItem.findById(cart_id);

    if (cartItem) {
      res.status(200).json(cartItem);
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding cart item", error: error.message });
  }
};
