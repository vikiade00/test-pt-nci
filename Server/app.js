const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const allRoute = require("./routes");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(allRoute);
app.use(express.urlencoded({ extended: true })); // Untuk form-urlencoded

db.then(() => {
  console.log("Berhasil connect ke mongoose db jadwal konveksi");
}).catch((error) => {
  console.log("Gagal connect ke mongoose " + error);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
