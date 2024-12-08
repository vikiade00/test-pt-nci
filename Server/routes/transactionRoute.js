const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/", verifyToken, transactionController.createTransaction);
router.get("/", verifyToken, transactionController.getAllTransactions);

module.exports = router;
