var express = require("express");
var router = express.Router();

let cartController = require("../controllers/cart");

// Define routes
router.post("/create", cartController.createCartItem);
router.get("/get/:userId", cartController.getCartItems);
router.put("/update/:cart_id", cartController.updateCartItem);
router.delete("/delete/:cart_id", cartController.deleteCartItem);
router.get("/find/:cart_id", cartController.findCartItem);

module.exports = router;
