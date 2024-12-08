const Stock = require("../models/Stock");

// Mendapatkan data stok berdasarkan warehouse
exports.getStocksByWarehouse = async (req, res) => {
  try {
    const { warehouse_id } = req.params;

    // Cari stok berdasarkan warehouse_id
    const stocks = await Stock.find({ warehouse_id })
      .sort({ createdAt: -1 })
      .populate("warehouse_id", "name") // Ambil informasi nama gudang
      .populate("product_id", "name"); // Ambil informasi nama produk

    if (stocks.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Tidak ada data stok ditemukan untuk warehouse dengan ID: ${warehouse_id}.`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data stok untuk warehouse.",
      data: stocks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Terjadi kesalahan saat mengambil data stok berdasarkan warehouse.",
      error: error.message,
    });
  }
};
