const mongoose = require("mongoose");

// Define schema for transaction
const transactionSchema = new mongoose.Schema(
  {
    transaction_id: {
      type: String,
      unique: true,
    },
    transaction_type: {
      type: String,
      enum: ["in", "out"],
      required: true,
    },
    warehouse_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware untuk generate transaction_id
transactionSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  // Ambil tanggal sekarang dalam format YYYYMMDD
  const dateNow = new Date().toISOString().split("T")[0].replace(/-/g, "");

  // Cari transaksi terakhir berdasarkan `transaction_id`
  const lastTransaction = await Transaction.findOne()
    .sort({ transaction_id: -1 })
    .exec();

  // Default ID jika belum ada data
  let newTransactionId = `TR-0001-${dateNow}`;

  if (lastTransaction) {
    const lastIdPart = lastTransaction.transaction_id.split("-")[1]; // Ambil angka
    const nextId = parseInt(lastIdPart) + 1; // Increment angka
    newTransactionId = `TR-${nextId.toString().padStart(4, "0")}-${dateNow}`; // Format ID
  }

  this.transaction_id = newTransactionId; // Set transaction_id
  next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
