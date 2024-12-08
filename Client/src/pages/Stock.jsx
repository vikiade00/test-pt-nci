import React, { useState, useEffect } from "react";
import { useStock } from "../context/stockContext";
import { useWarehouse } from "../context/warehouseContext";

const Stock = () => {
  const { stockList, loading, error, fetchStockByWarehouse } = useStock();
  const { warehouseList } = useWarehouse(); // Perbaikan: ganti warehousList ke warehouseList
  const [warehouseId, setWarehouseId] = useState(""); // Tambahkan state untuk warehouseId

  const handleSearch = () => {
    if (warehouseId) {
      fetchStockByWarehouse(warehouseId);
    }
  };

  return (
    <div>
      <div className="text-2xl font-bold mb-5">Stock</div>
      <div className="flex justify-between mb-4">
        {/* Select untuk memilih warehouse */}
        <div className="flex gap-2">
          <select
            className="select select-bordered select-sm"
            value={warehouseId}
            onChange={(e) => setWarehouseId(e.target.value)}
          >
            <option disabled selected>
              Select Warehouse
            </option>
            {warehouseList.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto max-h-96 border rounded-lg mt-5">
        <table className="table table-auto table-zebra table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th>No</th>
              <th>Produk</th>
              <th>Warehouse</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : stockList.length > 0 ? (
              stockList.map((stock, index) => (
                <tr key={stock._id}>
                  <td>{index + 1}</td>
                  <td>{stock.product_id?.name || "N/A"}</td>
                  <td>{stock.warehouse_id?.name || "N/A"}</td>
                  <td>{stock.qty}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stock;
