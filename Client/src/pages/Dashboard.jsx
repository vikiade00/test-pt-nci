import React from "react";
import { useProduct } from "../context/productContext";
import { useWarehouse } from "../context/warehouseContext";
import { useTransactions } from "../context/transactionsContext";
import { Barcode, Basket, Warehouse } from "@phosphor-icons/react";

const Dashboard = () => {
  const { productList } = useProduct();
  const { warehouseList } = useWarehouse();
  const { transactionsList } = useTransactions();

  return (
    <div>
      <div className="text-2xl font-bold mb-5">Dashboard</div>
      <div className="flex justify-center gap-5">
        <div className="shadow w-56 h-32 flex justify-between p-5 items-center bg-red-500 rounded-xl text-white">
          <div className="text-xl font-semibold">
            <Barcode size={30} /> Data Product
          </div>
          <div className="text-2xl font-bold">{productList.length}</div>
        </div>
        <div className="shadow w-56 flex justify-between p-5 items-center bg-blue-500 rounded-xl text-white">
          <div className="text-xl font-semibold">
            <Warehouse size={30} /> Data Warehouse
          </div>
          <div className="text-2xl font-bold">{warehouseList.length}</div>
        </div>
        <div className="shadow w-56 flex justify-between p-5 items-center bg-green-500 rounded-xl text-white">
          <div className="text-xl font-semibold">
            <Basket size={30} /> Data Transactions
          </div>
          <div className="text-2xl font-bold">{transactionsList.length}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
