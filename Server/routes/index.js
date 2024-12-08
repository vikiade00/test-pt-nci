const express = require("express");
const route = express.Router();
const productRoute = require("./productRoute");
const warehouseRoute = require("./warehouseRoute");
const transactionRoute = require("./transactionRoute");
const authRoute = require("./authRoute");
const stockRoute = require("./stockRoute");

route.get("/", (req, res) => {
  try {
    res.status(200).json("Selamat datang di API Inventory Control");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.use("/products", productRoute);
route.use("/warehouses", warehouseRoute);
route.use("/transactions", transactionRoute);
route.use("/auth", authRoute);
route.use("/stocks", stockRoute);

module.exports = route;
