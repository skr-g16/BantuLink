import React, { useState } from "react";
import { useParams } from "react-router-dom";

export const Donation = ({ isDarkMode, requestDetail, postDonation }) => {
  const { id } = useParams(); // requestId dari URL
  const [donationItems, setDonationItems] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleAddDonationItem = () => {
    setDonationItems([
      ...donationItems,
      { requestItemId: "", quantity: 0, descriptions: "" },
    ]);
  };

  const handleChangeDonationItem = (index, field, value) => {
    const updatedItems = [...donationItems];
    updatedItems[index][field] = value;
    setDonationItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await postDonation(id, donationItems, description);
      setSuccessMessage("Donasi berhasil dikirim!");
      setDonationItems([]);
      setDescription("");
    } catch (err) {
      setError(err.message || "Gagal mengirim donasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-${isDarkMode ? "gray-900" : "white"}`}>
      <div className={`max-w-3xl mx-auto p-8 bg-${isDarkMode ? "gray-800" : "gray-100"} rounded-lg shadow-xl`}>
        <h2 className={`text-2xl font-bold text-${isDarkMode ? "white" : "gray-900"} mb-6`}>Input Donasi</h2>
        {error && (
          <div className="mb-4 p-4 text-red-600 bg-red-100 rounded-lg">
            <p>{error}</p>
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-4 text-green-600 bg-green-100 rounded-lg">
            <p>{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium text-${isDarkMode ? "gray-300" : "gray-700"}`}>
              Deskripsi Donasi
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
              className={`mt-1 block w-full p-3 ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"} rounded-md shadow-sm`}
            />
          </div>

          <div>
            <h3 className={`text-lg font-semibold text-${isDarkMode ? "white" : "gray-900"} mb-4`}>Item Donasi</h3>
            {donationItems.map((item, index) => (
              <div key={index} className={`mb-4 p-4 bg-${isDarkMode ? "gray-700" : "gray-50"} rounded-lg`}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={`block text-sm font-medium text-${isDarkMode ? "gray-300" : "gray-700"}`}>
                      ID Barang
                    </label>
                    <input
                      type="text"
                      value={item.requestItemId}
                      onChange={(e) =>
                        handleChangeDonationItem(index, "requestItemId", e.target.value)
                      }
                      required
                      className={`mt-1 block w-full p-3 ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"} rounded-md shadow-sm`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-${isDarkMode ? "gray-300" : "gray-700"}`}>
                      Jumlah
                    </label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleChangeDonationItem(index, "quantity", e.target.value)
                      }
                      min={1}
                      required
                      className={`mt-1 block w-full p-3 ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"} rounded-md shadow-sm`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-${isDarkMode ? "gray-300" : "gray-700"}`}>
                      Deskripsi
                    </label>
                    <textarea
                      value={item.descriptions}
                      onChange={(e) =>
                        handleChangeDonationItem(index, "descriptions", e.target.value)
                      }
                      rows={2}
                      required
                      className={`mt-1 block w-full p-3 ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"} rounded-md shadow-sm`}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddDonationItem}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
            >
              + Tambah Item
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Kirim Donasi"}
          </button>
        </form>
      </div>
    </div>
  );
};
