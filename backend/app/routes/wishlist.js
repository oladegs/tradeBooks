var express = require("express");
var router = express.Router();

let wishListController = require("../controllers/wishlist");

router.post("/create", wishListController.createWishlistItem);
router.get("/get/:user_id", wishListController.getWishlistByUser);
router.delete("/delete/:wishList_id", wishListController.deleteWishlistItem);
router.put("/update/:wishList_id", wishListController.updateWishlistItem);

module.exports = router;
