const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
  {
    warehouse_id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware untuk mengatur warehouse_id otomatis
warehouseSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  // Cari warehouse terakhir berdasarkan `warehouse_id`
  const lastWarehouse = await Warehouse.findOne().sort({ warehouse_id: -1 });

  // Tentukan warehouse_id baru
  let newWarehouseId = "WRS-0000"; // Default ID jika belum ada data
  if (lastWarehouse) {
    const lastId = lastWarehouse.warehouse_id.split("-")[1]; // Ambil angka dari ID terakhir
    const nextId = parseInt(lastId) + 1; // Increment angka
    newWarehouseId = `WRS-${nextId.toString().padStart(4, "0")}`; // Format ID
  }

  this.warehouse_id = newWarehouseId; // Set warehouse_id baru
  next();
});

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse;
