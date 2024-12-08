import React, { useState } from "react";
import { useWarehouse } from "../context/warehouseContext";

const Warehouses = () => {
  const {
    warehouseList,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
    loading,
  } = useWarehouse();

  const [searchTerm, setSearchTerm] = useState("");
  const [newWarehouseName, setNewWarehouseName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const filteredWarehouses = warehouseList.filter((warehouse) => {
    const search = searchTerm.toLowerCase();
    return (
      warehouse.name.toLowerCase().includes(search) ||
      warehouse.warehouse_id.toLowerCase().includes(search)
    );
  });

  // Tambah warehouse
  const handleAddWarehouse = async (e) => {
    e.preventDefault();
    if (!newWarehouseName.trim()) {
      alert("Nama warehouse tidak boleh kosong.");
      return;
    }
    await createWarehouse({ name: newWarehouseName });
    setNewWarehouseName("");
  };

  // Simpan perubahan warehouse
  const handleSaveEdit = async (id) => {
    if (!editingName.trim()) {
      alert("Nama warehouse tidak boleh kosong.");
      return;
    }
    await updateWarehouse(id, { name: editingName });
    setEditingId(null);
    setEditingName("");
  };

  // Hapus warehouse
  const handleDeleteWarehouse = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus warehouse ini?")) {
      await deleteWarehouse(id);
    }
  };

  return (
    <div>
      <div className="text-2xl font-bold mb-5">Warehouse</div>
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

        {/* Form Tambah Warehouse */}
        <form onSubmit={handleAddWarehouse} className="flex gap-2">
          <input
            type="text"
            className="input input-sm input-bordered"
            placeholder="Masukan nama warehouse ..."
            value={newWarehouseName}
            onChange={(e) => setNewWarehouseName(e.target.value)}
          />
          <button className="btn btn-primary btn-sm" type="submit">
            Tambah
          </button>
        </form>
      </div>

      {/* Tabel Warehouse */}
      <div className="overflow-x-auto max-h-96 border rounded-lg mt-5">
        <table className="table table-auto table-zebra table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th>No</th>
              <th>Kode Warehouse</th>
              <th>Nama Warehouse</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {!loading && filteredWarehouses.length > 0 ? (
              filteredWarehouses.map((warehouse, index) => (
                <tr key={warehouse._id}>
                  <td>{index + 1}</td>
                  <td>{warehouse.warehouse_id}</td>
                  <td>
                    {editingId === warehouse._id ? (
                      <input
                        type="text"
                        className="input input-sm input-bordered"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                      />
                    ) : (
                      warehouse.name
                    )}
                  </td>
                  <td>
                    {editingId === warehouse._id ? (
                      <>
                        <button
                          className="btn btn-success btn-sm mr-2"
                          onClick={() => handleSaveEdit(warehouse._id)}
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
                            setEditingId(warehouse._id);
                            setEditingName(warehouse.name);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => handleDeleteWarehouse(warehouse._id)}
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
                  {loading ? "Loading..." : "No warehouses found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Warehouses;
