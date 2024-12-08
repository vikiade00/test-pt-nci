import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/products");
      setProductList(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create new product
  const createProduct = async (newProduct) => {
    try {
      const response = await api.post("/products", newProduct);
      setProductList((prevList) => [...prevList, response.data.data]);
      fetchProducts();
    } catch (err) {
      console.error("Error creating product:", err);
      setError(err.message);
    }
  };

  // Update product
  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await api.put(`/products/${id}`, updatedProduct);
      setProductList((prevList) =>
        prevList.map((product) =>
          product.product_id === id ? response.data.data : product
        )
      );
      fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
      setError(err.message);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProductList((prevList) =>
        prevList.filter((product) => product.product_id !== id)
      );
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        productList,
        loading,
        error,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
