import React, { useState } from "react";
import { useTransactions } from "../context/transactionsContext";
import { useWarehouse } from "../context/warehouseContext";
import { useProduct } from "../context/productContext";
import { useNavigate } from "react-router-dom";

const FormTransaction = () => {
  const { createTransaction } = useTransactions();
  const { warehouseList } = useWarehouse();
  const { productList } = useProduct();

  const [formData, setFormData] = useState({
    warehouse_id: "",
    product_id: "",
    transaction_type: "",
    qty: 1,
  });

  const user_id = localStorage.getItem("id");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user_id) {
      console.error("User ID not found in localStorage!");
      return;
    }

    const transactionData = { ...formData, user_id };
    await createTransaction(transactionData);

    // Reset form after submission
    setFormData({
      warehouse_id: "",
      product_id: "",
      transaction_type: "",
      qty: 1,
    });
    navigate("/transactions");
  };

  return (
    <div>
      <div className="text-2xl font-bold mb-5">Transaction Form</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-start">
        <select
          name="warehouse_id"
          value={formData.warehouse_id}
          onChange={handleChange}
          className="select select-bordered w-full max-w-xs"
          required
        >
          <option disabled value="">
            Nama Warehouse
          </option>
          {warehouseList.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          name="product_id"
          value={formData.product_id}
          onChange={handleChange}
          className="select select-bordered w-full max-w-xs"
          required
        >
          <option disabled value="">
            Nama Product
          </option>
          {productList.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          name="transaction_type"
          value={formData.transaction_type}
          onChange={handleChange}
          className="select select-bordered w-full max-w-xs"
          required
        >
          <option disabled value="">
            Transactions Type
          </option>
          <option value="in">In</option>
          <option value="out">Out</option>
        </select>

        <input
          type="number"
          name="qty"
          value={formData.qty}
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
          placeholder="Quantity"
          min="1"
          required
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormTransaction;
