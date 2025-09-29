import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Address {
  id: string;
  label: string;
  tag: "HOME" | "OFFICE";
  address: string;
  phone: string;
}

const initialAddresses: Address[] = [
  {
    id: "1",
    label: "2118 Thornridge",
    tag: "HOME",
    address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
    phone: "(209) 555-0104"
  },
  {
    id: "2",
    label: "Headoffice",
    tag: "OFFICE",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    phone: "(704) 555-0127"
  }
];

export default function AddressStep() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("1");
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);
  const [formAddress, setFormAddress] = useState({
    label: "",
    tag: "HOME" as "HOME" | "OFFICE",
    address: "",
    phone: ""
  });

  const openAddModal = () => {
    setModalMode("add");
    setFormAddress({ label: "", tag: "HOME", address: "", phone: "" });
    setShowModal(true);
  };

  const openEditModal = (id: string) => {
    const addr = addresses.find((a) => a.id === id);
    if (!addr) return;
    setModalMode("edit");
    setCurrentEditId(id);
    setFormAddress({
      label: addr.label,
      tag: addr.tag,
      address: addr.address,
      phone: addr.phone
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (
      formAddress.label.trim() === "" ||
      formAddress.address.trim() === "" ||
      formAddress.phone.trim() === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (modalMode === "add") {
      const id = (addresses.length + 1).toString();
      setAddresses([...addresses, { id, ...formAddress }]);
      setSelected(id);
    } else if (modalMode === "edit" && currentEditId) {
      setAddresses(
        addresses.map((a) =>
          a.id === currentEditId ? { ...a, ...formAddress } : a
        )
      );
    }

    setShowModal(false);
    setCurrentEditId(null);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white">
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded-full bg-black flex items-center justify-center">
              <span className="text-xs text-white font-bold">1</span>
            </span>
            <span className="font-semibold text-black">Address</span>
          </div>
          <div className="flex items-center space-x-2 opacity-40">
            <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
              <span className="text-xs text-black font-bold">2</span>
            </span>
            <span className="font-semibold text-black">Shipping</span>
          </div>
          <div className="flex items-center space-x-2 opacity-40">
            <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
              <span className="text-xs text-black font-bold">3</span>
            </span>
            <span className="font-semibold text-black">Payment</span>
          </div>
        </div>
     
        <h2 className="text-lg font-semibold mb-4">Select Address</h2>

        <div className="flex flex-col space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg bg-gray-100 px-4 py-3
                ${selected === addr.id ? "border-2 border-black" : "border border-transparent"}
              `}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  className="form-radio mr-3"
                  checked={selected === addr.id}
                  onChange={() => setSelected(addr.id)}
                  name="selected-address"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{addr.label}</span>
                    <span className="text-xs bg-black text-white rounded px-2 py-0.5">
                      {addr.tag}
                    </span>
                  </div>
                  <span className="block text-sm text-gray-600">{addr.address}</span>
                  <span className="block text-sm text-gray-600">{addr.phone}</span>
                </div>
              </div>
              <div className="flex space-x-4 mt-2 sm:mt-0 sm:ml-4">
                <button
                  title="Edit"
                  className="text-gray-600 hover:text-black"
                  onClick={() => openEditModal(addr.id)}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15.232 4.232l-3.464-3.464M2 16v-2.828l9.192-9.192a2 2 0 012.828 0l1.172 1.172a2 2 0 010 2.828L5.828 16H2z" />
                  </svg>
                </button>
                <button
                  title="Delete"
                  className="text-gray-600 hover:text-black"
                  onClick={() => setAddresses(addresses.filter((a) => a.id !== addr.id))}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="9" r="8" stroke="currentColor" />
                    <path d="M6 9l6 0M9 6l0 6" stroke="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center my-6">
          <button
            className="flex flex-col items-center focus:outline-none"
            onClick={openAddModal}
          >
            <span className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center text-2xl text-black">
              +
            </span>
            <span className="text-sm mt-1 text-gray-800">Add New Address</span>
          </button>
        </div>

        <div className="flex justify-between mt-8">
          <button 
            onClick={() => navigate('/cart')}
            className="px-6 py-2 border border-black rounded hover:bg-gray-100"
          >
            Back to Cart
          </button>
          <button 
            onClick={() => navigate('/shipping')}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-900"
          >
            Next
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
              <h3 className="text-lg font-semibold mb-4">
                {modalMode === "add" ? "Add New Address" : "Edit Address"}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="flex flex-col space-y-4"
              >
                <input
                  type="text"
                  placeholder="Label (e.g., Home, Office)"
                  className="border border-gray-300 p-2 rounded"
                  value={formAddress.label}
                  onChange={(e) =>
                    setFormAddress({ ...formAddress, label: e.target.value })
                  }
                  required
                />
                <select
                  className="border border-gray-300 p-2 rounded"
                  value={formAddress.tag}
                  onChange={(e) =>
                    setFormAddress({
                      ...formAddress,
                      tag: e.target.value as "HOME" | "OFFICE"
                    })
                  }
                >
                  <option value="HOME">HOME</option>
                  <option value="OFFICE">OFFICE</option>
                </select>
                <textarea
                  placeholder="Address"
                  className="border border-gray-300 p-2 rounded h-20"
                  value={formAddress.address}
                  onChange={(e) =>
                    setFormAddress({ ...formAddress, address: e.target.value })
                  }
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="border border-gray-300 p-2 rounded"
                  value={formAddress.phone}
                  onChange={(e) =>
                    setFormAddress({ ...formAddress, phone: e.target.value })
                  }
                  required
                />
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    className="px-4 py-2 border rounded"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
                  >
                    {modalMode === "add" ? "Add" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
