import React, { useState } from "react";
import { useProduct } from "../context/productContext";

const Products = () => {
  const { productList, createProduct, updateProduct, deleteProduct, loading } =
    useProduct();

  const [searchTerm, setSearchTerm] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const filteredProducts = productList.filter((product) => {
    const search = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(search) ||
      product.product_id.toLowerCase().includes(search)
    );
  });

  // Tambah produk
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProductName.trim()) {
      alert("Nama produk tidak boleh kosong.");
      return;
    }
    await createProduct({ name: newProductName });
    setNewProductName("");
  };

  // Simpan perubahan produk
  const handleSaveEdit = async (id) => {
    if (!editingName.trim()) {
      alert("Nama produk tidak boleh kosong.");
      return;
    }
    await updateProduct(id, { name: editingName });
    setEditingId(null);
    setEditingName("");
  };

  // Hapus produk
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      await deleteProduct(id);
    }
  };

  return (
    <div>
      <div className="text-2xl font-bold mb-5">Product</div>
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
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        {/* Form Tambah Produk */}
        <form onSubmit={handleAddProduct} className="flex gap-2">
          <input
            type="text"
            className="input input-sm input-bordered"
            placeholder="Masukan nama barang ..."
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
          />
          <button className="btn btn-primary btn-sm" type="submit">
            Tambah
          </button>
        </form>
      </div>

      {/* Tabel Produk */}
      <div className="overflow-x-auto max-h-96 border rounded-lg mt-5">
        <table className="table table-auto table-zebra table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th>No</th>
              <th>Kode Produk</th>
              <th>Nama Produk</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {!loading && filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.product_id}</td>
                  <td>
                    {editingId === product._id ? (
                      <input
                        type="text"
                        className="input input-sm input-bordered"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td>
                    {editingId === product._id ? (
                      <>
                        <button
                          className="btn btn-success btn-sm mr-2"
                          onClick={() => handleSaveEdit(product._id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-info btn-sm mr-2"
                          onClick={() => {
                            setEditingId(product._id);
                            setEditingName(product.name);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  {loading ? "Loading..." : "No products found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
