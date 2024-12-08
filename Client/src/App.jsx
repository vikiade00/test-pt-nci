import { Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Warehouse from "./pages/Warehouse";
import Transactions from "./pages/Transactions";
import Stock from "./pages/Stock";
import Login from "./pages/Login";
import FormTransaction from "./pages/FormTransaction";
import Register from "./pages/Register";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div>
      <Routes>
        {/* Rute yang dilindungi */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="warehouses" element={<Warehouse />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="transactions/form" element={<FormTransaction />} />
          <Route path="stock" element={<Stock />} />
        </Route>

        {/* Rute login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Halaman 404 */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
