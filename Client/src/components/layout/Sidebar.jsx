import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import {
  Barcode,
  Basket,
  Database,
  Gauge,
  SignOut,
  Warehouse,
} from "@phosphor-icons/react";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      alert("Logout gagal. Silakan coba lagi.");
    }
  };

  return (
    <div className="bg-gray-200 w-52 p-2">
      <div className="font-bold mb-5 text-xl">E-Inventory</div>
      <ul className="menu bg-base-200 rounded-box gap-2">
        <li>
          <Link to="/">
            <div className="flex items-center gap-2">
              <Gauge size={20} />
              Dashboard
            </div>
          </Link>
        </li>
        <li>
          {" "}
          <Link to="products">
            <div className="flex items-center gap-2">
              <Barcode size={20} />
              Products
            </div>
          </Link>
        </li>
        <li>
          <Link to="warehouses">
            <div className="flex items-center gap-2">
              <Warehouse size={20} />
              Warehouses
            </div>
          </Link>
        </li>
        <li>
          <Link to="transactions">
            <div className="flex items-center gap-2">
              <Basket size={20} />
              Transactions
            </div>
          </Link>
        </li>
        <li>
          <Link to="stock">
            <div className="flex items-center gap-2">
              <Database size={20} />
              Stock
            </div>
          </Link>
        </li>
        <li className="bg-primary rounded-lg text-white">
          <Link onClick={handleLogout}>
            <div className="flex items-center gap-2">
              <SignOut size={20} />
              Logout
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
