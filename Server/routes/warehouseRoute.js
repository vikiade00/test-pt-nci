const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouseController");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/", verifyToken, warehouseController.createWarehouse);
router.get("/", verifyToken, warehouseController.getAllWarehouses);
router.get("/:id", verifyToken, warehouseController.getWarehouseById);
router.put("/:id", verifyToken, warehouseController.updateWarehouse);
router.delete("/:id", verifyToken, warehouseController.deleteWarehouse);

module.exports = router;
