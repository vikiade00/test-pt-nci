import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Envelope, Password, User } from "@phosphor-icons/react";

const Register = () => {
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { ...formData };
    try {
      await register(userData);
      navigate("/login"); // Redirect setelah berhasil register
    } catch (err) {
      alert("Terjadi kesalahan saat registrasi");
    }
  };

  return (
    <div className="h-screen bg-slate-100 flex justify-center items-center">
      <div className="border bg-white shadow-xl p-10 rounded-lg">
        <h2 className="text-center mb-5 font-semibold text-2xl">
          Register To Your Account
        </h2>
        <form onSubmit={handleSubmit} className="flex gap-2 flex-col">
          {/* Name Input */}
          <label className="input input-bordered flex items-center gap-2">
            <User size={20} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="grow"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <Envelope size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="grow"
              required
            />
          </label>

          {/* Password Input */}
          <label className="input input-bordered flex items-center gap-2">
            <Password size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="grow"
              required
            />
          </label>

          <button
            className={`btn btn-primary mt-2 ${loading ? "btn-disabled" : ""}`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="mt-2">
          Sudah mempunyai akun?{" "}
          <a href="/login" className="text-primary">
            Masuk disini!
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
