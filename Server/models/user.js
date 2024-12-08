const mongoose = require("mongoose");

// Counter schema untuk melacak nomor user
const counterSchema = new mongoose.Schema({
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.model("Counter", counterSchema);

const userSchema = new mongoose.Schema(
  {
    user_id: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Pre-save hook untuk generate custom user_id
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      // Ambil nomor urut terbaru dari Counter
      const counter = await Counter.findOneAndUpdate(
        {}, // Filter kosong, hanya ada 1 counter global
        { $inc: { seq: 1 } }, // Increment seq
        { upsert: true, new: true } // Buat baru jika belum ada
      );

      // Format user_id
      this.user_id = `USR-${String(counter.seq).padStart(3, "0")}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
