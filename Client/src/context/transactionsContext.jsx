import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactionsList, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransanctions = async () => {
    setLoading(true);
    try {
      const response = await api.get("/transactions");
      setTransactions(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (newTransaction) => {
    try {
      const response = await api.post("/transactions", newTransaction);
      setTransactions((prevList) => [...prevList, response.data.data]);
      fetchTransanctions();
    } catch (err) {
      console.error("Error creating product:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTransanctions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactionsList,
        loading,
        fetchTransanctions,
        createTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
