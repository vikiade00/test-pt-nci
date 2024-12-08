const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
  // Ambil token dari header Authorization
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Akses ditolak. Token tidak disediakan.",
    });
  }

  try {
    // Token format: "Bearer <token>", kita hanya butuh tokennya
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Akses ditolak. Token tidak valid.",
      });
    }

    // Verifikasi token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Simpan data user yang didekodekan ke `req.user`
    next(); // Lanjut ke middleware atau controller berikutnya
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Token tidak valid.",
    });
  }
};
