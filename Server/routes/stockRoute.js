const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");
const { verifyToken } = require("../middleware/verifyToken");

router.get(
  "/warehouse/:warehouse_id",
  verifyToken,
  stockController.getStocksByWarehouse
);

module.exports = router;
