const Product = require("../models/product");

// Menambahkan produk baru
exports.createProduct = async (req, res) => {
  try {
    const { name } = req.body;

    // Validasi input
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Mohon lengkapi data produk.",
      });
    }

    const product = new Product({ name });
    await product.save();

    res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan.",
      data: product,
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
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan daftar produk.",
      data: products,
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
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan detail produk.",
      data: product,
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
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Produk berhasil diperbarui.",
      data: product,
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
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
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
