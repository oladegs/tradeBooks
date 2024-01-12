/*
User Model:
Fields:  user_id,username, email, password (hashed), role (seller or buyer)
Purpose: Stores user account information for authentication, registration, and role management.
*/

const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4


const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    // user_id: {
    //   type: mongoose.Types.ObjectId,
    //   index: true,
    //   required: true,
    //   auto: true,
    // },
       userId: {
         type: String,
        unique: true,
        required: true,
        default: uuidv4, // Generates a UUID by default for new users
      },
    username: {
      type: String,
      unique: true,
      required: "Username is required",
      trim: true,
    },
    profile: {
      firstName: String,
      lastName: String,
    },
    email: {
      type: String,
      unique: true,
      required: "Email is required",
      match: [/.+\@.+\..+/, "Please fill a valid e-mail address"],
    },
    hashed_password: {
      type: String,
      required: "Password is required",
    },
    role: {
      type: String,
      enum: ["seller", "buyer"],
      required: "Role is required",
    },
    salt: String,
    created: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updated: {
      type: Date,
      default: Date.now,
    },
     // Add additional profile fields if needed
     
     phoneNumber: String, 
     
      address: {
        street: String,
        city: String,
        country: String,
        postalCode: String,
        state: String, 
       
      },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
  }
);

UserSchema.virtual("password").set(function (password) {
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  } else {
    this.salt = Buffer.from(
      crypto.randomBytes(16).toString("base64"),
      "base64"
    );
    this.hashed_password = this.hashPassword(password);
  }
});

UserSchema.methods.hashPassword = function (password) {
  if (!password) {
    throw new Error("Password is required");
  }
  if (!this.salt) {
    this.salt = Buffer.from(
      crypto.randomBytes(16).toString("base64"),
      "base64"
    );
  }
  return crypto
    .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
    .toString("base64");
};

UserSchema.methods.authenticate = function (password) {
  return this.hashed_password === this.hashPassword(password);
};

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
   delete ret._id;
    delete ret.hashed_password;
    delete ret.salt;
  },
});

module.exports = mongoose.model("User", UserSchema);
