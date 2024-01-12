/*
Book Model:
Fields: isbn, category, title, author, condition, price, description, expiryDate
Purpose: Represents details of each book listing, including title, author, condition, price, and seller information.
*/
let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    isbn: {
      type: String,
      required: "ISBN is required",
      unique: true,
    },
    category: {
      type: String,
      required: "Category is required",
    },
    title: {
      type: String,
      required: "Title is required",
    },
    author: {
      type: String,
      required: "Author is required",
    },
    condition: {
      type: String,
      required: "Condition is required",
      enum: ["New", "Like new", "Used", "Worn"],
    },
    price: {
      type: Number,
      required: "Price is required",
      min: 0,
    },
    description: {
      type: String,
      required: "Description is required",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // expiryDate: {
    //   type: Date,
    //   required: "Expiry date is required",
    // },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "books",
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", BookSchema);
