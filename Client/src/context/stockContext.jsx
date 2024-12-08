import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const StockContext = createContext();

export const useStock = () => useContext(StockContext);

export const StockProvider = ({ children }) => {
  const [stockList, setStockList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockByWarehouse = async (warehouse_id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/stocks/warehouse/${warehouse_id}`);
      setStockList(response.data.data);
    } catch (err) {
      console.error("Error fetching stocks:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StockContext.Provider
      value={{
        stockList,
        loading,
        error,
        fetchStockByWarehouse,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};
