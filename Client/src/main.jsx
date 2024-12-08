import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/productContext.jsx";
import { WarehouseProvider } from "./context/warehouseContext.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { TransactionProvider } from "./context/transactionsContext.jsx";
import { StockProvider } from "./context/stockContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WarehouseProvider>
          <ProductProvider>
            <TransactionProvider>
              <StockProvider>
                <App />
              </StockProvider>
            </TransactionProvider>
          </ProductProvider>
        </WarehouseProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
