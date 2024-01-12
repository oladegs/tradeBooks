var express = require("express");
var router = express.Router();

let orderController = require("../controllers/order");

// Define routes
router.post("/create", orderController.createOrder);
router.get("/get/:user_id", orderController.getUserOrders);
router.put("/update/:order_id", orderController.updateOrderStatus);
router.delete("/delete/:order_id", orderController.deleteOrder);
router.get("/find/:order_id", orderController.findOrderById);

module.exports = router;
