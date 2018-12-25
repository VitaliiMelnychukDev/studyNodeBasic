const express = require("express");
const router = express.Router();

const OrdersController = require("../controllers/orders");

router.get("/", OrdersController.ordersGetAll);

router.post("/", OrdersController.orderCreate);

router.get("/:orderId", OrdersController.getOrder);

router.delete("/:orderId", OrdersController.deleteOrder);

module.exports = router;