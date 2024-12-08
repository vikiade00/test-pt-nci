import React, { useState } from "react";
import { useTransactions } from "../context/transactionsContext";
import { Link } from "react-router-dom";

const Transactions = () => {
  const { transactionsList, loading } = useTransactions();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactionsList.filter((transaction) => {
    const search = searchTerm.toLowerCase();
    return (
      transaction.transaction_id.toLowerCase().includes(search) ||
      transaction.product_id.name.toLowerCase().includes(search) ||
      transaction.warehouse_id.name.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      <div className="text-2xl font-bold mb-5">Transaction</div>
      <div className="flex justify-between">
        {/* Input Pencarian */}
        <label className="input input-bordered input-sm flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1-1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <Link to="/transactions/form">
          <button className="btn btn-primary btn-sm" type="button">
            Tambah
          </button>
        </Link>
      </div>

      {/* Tabel Transaksi */}
      <div className="overflow-x-auto max-h-96 border rounded-lg mt-5">
        <table className="table table-auto table-zebra table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th>No</th>
              <th>Transaction ID</th>
              <th>Product</th>
              <th>Warehouse</th>
              <th>User ID</th>
              <th>Type</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            {!loading && filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <tr key={transaction.transaction_id}>
                  <td>{index + 1}</td>
                  <td>{transaction.transaction_id}</td>
                  <td>{transaction.product_id.name}</td>
                  <td>{transaction.warehouse_id.name}</td>
                  <td>{transaction.user_id.name}</td>
                  <td>{transaction.transaction_type}</td>
                  <td>{transaction.qty}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  {loading ? "Loading..." : "No transactions found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
