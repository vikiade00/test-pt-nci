const Stock = require("../models/Stock");
const Transaction = require("../models/Transaction");

// Menambahkan transaksi baru
exports.createTransaction = async (req, res) => {
  try {
    const { transaction_type, warehouse_id, product_id, user_id, qty } =
      req.body;

    // Validasi input
    if (
      !transaction_type ||
      !warehouse_id ||
      !product_id ||
      !user_id ||
      qty == null
    ) {
      return res.status(400).json({
        success: false,
        message: "Mohon lengkapi data transaksi.",
      });
    }

    // Cek apakah stock tersedia (jika "out")
    if (transaction_type === "out") {
      const stock = await Stock.findOne({ warehouse_id, product_id });
      if (!stock || stock.qty < qty) {
        return res.status(400).json({
          success: false,
          message: "Stok tidak mencukupi untuk transaksi pengeluaran.",
        });
      }
    }

    // Buat transaksi baru
    const transaction = new Transaction({
      transaction_type,
      warehouse_id,
      product_id,
      user_id,
      qty,
    });
    await transaction.save();

    // Update stok berdasarkan transaksi
    let stock = await Stock.findOne({ warehouse_id, product_id });
    if (!stock) {
      stock = new Stock({
        stock_id: `${warehouse_id}-${product_id}`,
        warehouse_id,
        product_id,
        qty: 0,
      });
    }

    if (transaction_type === "in") {
      stock.qty += qty;
    } else if (transaction_type === "out") {
      stock.qty -= qty;
    }

    await stock.save();

    res.status(201).json({
      success: true,
      message: "Transaksi berhasil ditambahkan dan stok diperbarui.",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menambahkan transaksi.",
      error: error.message,
    });
  }
};

// Mendapatkan semua transaksi
exports.getAllTransactions = async (req, res) => {
  try {
    // const transactions = await Transaction.find().populate(
    //   "warehouse_id,  product_id user_id"
    // );

    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .populate("warehouse_id", "name")
      .populate("product_id", "name")
      .populate("user_id", "name");

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan daftar transaksi.",
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil daftar transaksi.",
      error: error.message,
    });
  }
};
