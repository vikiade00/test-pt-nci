const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Secret Key untuk JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Register
exports.register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Cek apakah email sudah digunakan
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email sudah terdaftar.",
      });
    }

    // Hash password sebelum menyimpannya
    const saltRounds = 10; // Jumlah salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Buat user baru dengan password yang sudah di-hash
    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil.",
      data: {
        user_id: newUser.user_id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat registrasi.",
      error: error.message,
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email atau password salah.",
      });
    }

    // Cek password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Email atau password salah.",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "1d", // Token berlaku selama 1 hari
      }
    );

    res.status(200).json({
      success: true,
      message: "Login berhasil.",
      id: user._id,
      user_id: user.user_id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat login.",
      error: error.message,
    });
  }
};
