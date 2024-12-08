const Warehouse = require("../models/warehouse");

// Menambahkan produk baru
exports.createWarehouse = async (req, res) => {
  try {
    const { name } = req.body;

    // Validasi input
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Mohon lengkapi data produk.",
      });
    }

    const warehouse = new Warehouse({ name });
    await warehouse.save();

    res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan.",
      data: warehouse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menambahkan produk.",
      error: error.message,
    });
  }
};

// Mendapatkan semua produk
exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan daftar produk.",
      data: warehouses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil daftar produk.",
      error: error.message,
    });
  }
};

// Mendapatkan produk berdasarkan ID
exports.getWarehouseById = async (req, res) => {
  try {
    const { id } = req.params;

    const warehouse = await Warehouse.findById(id);
    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan detail produk.",
      data: warehouse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil detail produk.",
      error: error.message,
    });
  }
};

// Mengupdate produk
exports.updateWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const warehouse = await Warehouse.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Produk berhasil diperbarui.",
      data: warehouse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memperbarui produk.",
      error: error.message,
    });
  }
};

// Menghapus produk
exports.deleteWarehouse = async (req, res) => {
  try {
    const { id } = req.params;

    const warehouse = await Warehouse.findByIdAndDelete(id);
    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Produk berhasil dihapus.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus produk.",
      error: error.message,
    });
  }
};
