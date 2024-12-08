import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Envelope, Password } from "@phosphor-icons/react";

const Login = () => {
  const { login, loading, error } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.email, credentials.password);
      navigate("/");
    } catch (err) {
      alert("Username atau password salah");
    }
  };

  return (
    <div className="h-screen bg-slate-100 flex justify-center items-center">
      <div className="border bg-white shadow-xl p-10 rounded-lg">
        <h2 className="text-center mb-5 font-semibold text-2xl">
          Login To Your Account
        </h2>
        <form onSubmit={handleSubmit} className="flex gap-2 flex-col">
          <label className="input input-bordered flex items-center gap-2">
            <Envelope size={20} />
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className="grow"
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <Password size={20} />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="grow"
              required
            />
          </label>
          <button
            className={`btn btn-primary mt-2 ${loading ? "btn-disabled" : ""}`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="mt-2">
          Belum mempunyai akun?{" "}
          <a href="/register" className="text-primary">
            Daftar disini!
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
