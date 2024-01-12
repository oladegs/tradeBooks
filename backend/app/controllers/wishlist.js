const Wishlist = require("../models/wishlist");

// Create a new Wishlist item
exports.createWishlistItem = async (req, res) => {
  try {
    const wishlistItem = new Wishlist({
      user_id: req.body.user_id,
      isbn: req.body.isbn,
    });

    const savedItem = await wishlistItem.save();
    res.status(201).json({
      message: "Wishlist item added successfully",
      data: savedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add item to wishlist",
      error: error.message,
    });
  }
};

// Retrieve Wishlist items by user
exports.getWishlistByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const wishlistItems = await Wishlist.find({ user_id: user_id });
    res.status(200).json(wishlistItems);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get wishlist items",
      error: error.message,
    });
  }
};

// Delete a Wishlist item
exports.deleteWishlistItem = async (req, res) => {
  try {
    const { wishList_id } = req.params;
    const deletedItem = await Wishlist.findByIdAndDelete(wishList_id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }
    res.status(200).json({
      message: "Wishlist item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete wishlist item",
      error: error.message,
    });
  }
};

// Update a Wishlist item
exports.updateWishlistItem = async (req, res) => {
  try {
    const { wishList_id } = req.params;
    const updates = req.body;
    const updatedItem = await Wishlist.findByIdAndUpdate(wishList_id, updates, {
      new: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }
    res.status(200).json({
      message: "Wishlist item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update wishlist item",
      error: error.message,
    });
  }
};
