import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const WarehouseContext = createContext();

export const useWarehouse = () => useContext(WarehouseContext);

export const WarehouseProvider = ({ children }) => {
  const [warehouseList, setWarehouseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWarehouses = async () => {
    setLoading(true);
    try {
      const response = await api.get("/warehouses");
      setWarehouseList(response.data.data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    } finally {
      setLoading(false);
    }
  };

  const createWarehouse = async (newWarehouse) => {
    try {
      const response = await api.post("/warehouses", newWarehouse);
      setWarehouseList((prevList) => [...prevList, response.data.data]);
      fetchWarehouses();
    } catch (err) {
      console.error("Error creating warehouse:", err);
      setError(err.message);
    }
  };

  const updateWarehouse = async (id, updatedWarehouse) => {
    try {
      const response = await api.put(`/warehouses/${id}`, updatedWarehouse);
      setWarehouseList((prevList) =>
        prevList.map((warehouse) =>
          warehouse.warehouse_id === id ? response.data.data : warehouse
        )
      );
      fetchWarehouses();
    } catch (err) {
      console.error("Error updating warehouse:", err);
      setError(err.message);
    }
  };

  const deleteWarehouse = async (id) => {
    try {
      await api.delete(`/warehouses/${id}`);
      setWarehouseList((prevList) =>
        prevList.filter((warehouse) => warehouse.warehouse_id !== id)
      );
      fetchWarehouses();
    } catch (err) {
      console.error("Error deleting warehouse:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <WarehouseContext.Provider
      value={{
        warehouseList,
        loading,
        error,
        fetchWarehouses,
        createWarehouse,
        updateWarehouse,
        deleteWarehouse,
      }}
    >
      {children}
    </WarehouseContext.Provider>
  );
};
