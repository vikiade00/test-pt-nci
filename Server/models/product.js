const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_id: {
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

productSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  const lastProduct = await Product.findOne().sort({ product_id: -1 });

  let newProductId = "PRD-0000"; // Default ID jika belum ada data
  if (lastProduct) {
    const lastId = lastProduct.product_id.split("-")[1]; // Ambil angka dari ID terakhir
    const nextId = parseInt(lastId) + 1; // Increment angka
    newProductId = `PRD-${nextId.toString().padStart(4, "0")}`; // Format ID
  }

  this.product_id = newProductId; // Set product_id baru
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
