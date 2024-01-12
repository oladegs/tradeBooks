/*
Wishlist Model:
Fields: wishList_id, user_id,isbn
Purpose: Stores a list of books that users want to save for future consideration.
*/
let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishlistSchema = new Schema(
  {
    wishList_id: {
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
      match: [/^\d{10,13}$/, "Please fill a valid ISBN number"], 
    },
  },
  {
    collection: "wishlists", 
    timestamps: true, 
  }
);

module.exports = mongoose.model("Wishlist", WishlistSchema);
