import React, { useState } from 'react';
import { APISource } from '../../data/source-api';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

export const Request = ({ isDarkMode }) => {
  const [disasterId, setDisasterId] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [requestItems, setRequestItems] = useState([{
    categoryId: '',
    quantity: 1,
    unitId: '',
    description: ''
  }]);

  const clearForm = () => {
    setDisasterId('');
    setDescription('');
    setRequestItems([{
      categoryId: '',
      quantity: 1,
      unitId: '',
      description: ''
    }]);
    toast.success('Form berhasil dikosongkan!');
  };

  const handleAddItem = () => {
    setRequestItems([...requestItems, {
      categoryId: '',
      quantity: 1,
      unitId: '',
      description: ''
    }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = requestItems.filter((_, i) => i !== index);
    setRequestItems(newItems);
    toast.success('Data berhasil dihapus');
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...requestItems];
    newItems[index][field] = field === 'quantity' ? parseInt(value) : value;
    setRequestItems(newItems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Set loading state to true
    setLoading(true);

    // Menggunakan SweetAlert2 untuk konfirmasi
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan mengirim permintaan ini.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, kirim!',
      cancelButtonText: 'Batal',
    });
  
    if (!result.isConfirmed) {
      setLoading(false); // Reset loading if the user cancels
      toast.error('Permintaan dibatalkan.');
      return; // Hentikan pengiriman jika tidak disetujui
    }
  
    if (!disasterId || !description || requestItems.some(item => !item.categoryId || !item.unitId || !item.description || item.quantity <= 0)) {
      toast.info('Silakan lengkapi semua field yang diperlukan.');
      setLoading(false); // Reset loading if validation fails
      return;
    }
  
    try {
      const response = await APISource.addNewRequest(disasterId, description, requestItems);
      console.log('response api: ', response);
      // Pastikan untuk mengakses id sesuai struktur response
      const requestId = response;
      localStorage.setItem('requestOwnerId', requestId);
      
      clearForm();
      toast.success('Permintaan berhasil dikirim!');
    } catch (error) {
      console.error(error);
      toast.error('Terjadi kesalahan saat mengirim permintaan.');
    } finally {
      // Set loading state to false after the request is complete
      setLoading(false); 
    }
  };

  const CATEGORIES = [
    { id: 'category-1', label: 'Makanan' },
    { id: 'category-2', label: 'Minuman' },
    { id: 'category-3', label: 'Pakaian' },
    { id: 'category-4', label: 'Obat-obatan' },
    { id: 'category-5', label: 'Perlengkapan Bayi' },
    { id: 'category-6', label: 'Perlengkapan Kebersihan' },
    { id: 'category-7', label: 'Perlengkapan Tidur' },
    { id: 'category-8', label: 'Perlengkapan Dapur' },
    { id: 'category-9', label: 'Perlengkapan Medis' },
    { id: 'category-10', label: 'Alat Tulis' },
    { id: 'category-11', label: 'Lainnya' },
  ];

  const DISASTERS = [
    { id: 'disaster-1', name: 'Gempa Bumi' },
    { id: 'disaster-2', name: 'Letusan Gunung Api' },
 { id: 'disaster-3', name: 'Tsunami' },
    { id: 'disaster-4', name: 'Tanah Longsor' },
    { id: 'disaster-5', name: 'Banjir' },
    { id: 'disaster-6', name: 'Banjir Bandang' },
    { id: 'disaster-7', name: 'Kekeringan' },
    { id: 'disaster-8', name: 'Kebakaran' },
    { id: 'disaster-9', name: 'Kebakaran Hutan' },
    { id: 'disaster-10', name: 'Angin Puting Beliung' },
    { id: 'disaster-11', name: 'Gelombang Pasang atau Badai' },
    { id: 'disaster-12', name: 'Kecelakaan transportasi' },
    { id: 'disaster-13', name: 'Kecelakaan Industri' },
    { id: 'disaster-14', name: 'Konflik Sosial' },
    { id: 'disaster-15', name: 'Aksi Teror' },
    { id: 'disaster-16', name: 'Sabotase' },
    { id: 'disaster-17', name: 'Lainnya' }
  ];

  const UNITS = [
    { id: 'unit-1', label: 'Pcs' },
    { id: 'unit-2', label: 'Kg' },
    { id: 'unit-3', label: 'Liter' },
    { id: 'unit-4', label: 'Gram' },
    { id: 'unit-5', label: 'Box' },
    { id: 'unit-6', label: 'Karton' },
    { id: 'unit-7', label: 'Pack' },
    { id: 'unit-8', label: 'Lusin' },
    { id: 'unit-9', label: 'Set' },
    { id: 'unit-10', label: 'Lainnya' },
  ];

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className={`max-w-3xl mx-auto rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-900'} mb-8`}>Buat Permintaan Bantuan</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>ID Bencana</label>
            <select
              value={disasterId}
              onChange={(e) => setDisasterId(e.target.value)}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white'}`}
            >
              <option value="" disabled>Pilih Bencana</option>
              {DISASTERS.map(disaster => (
                <option key={disaster.id} value={disaster.id}>
                  {disaster.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Deskripsi Umum</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white'}`}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Daftar Barang yang Dibutuhkan</h3>
              <button
                type="button"
                onClick={handleAddItem}
                className={`inline-flex items-center px-4 py -2 text-sm font-medium text-blue-600 hover:text-blue-800 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Tambah Barang
              </button>
            </div>

            {requestItems.map((item, index) => (
              <div key={index} className={`bg-gray-50 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Kategori</label>
                    <select
                      value={item.categoryId}
                      onChange={(e) => handleItemChange(index, 'categoryId', e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-white'}`}
                    >
                      <option value="" disabled>Pilih Kategori</option>
                      {CATEGORIES.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Jumlah</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-white'}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Satuan</label>
                    <select
                      value={item.unitId}
                      onChange={(e) => handleItemChange(index, 'unitId', e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-white'}`}
                    >
                      <option value="" disabled>Pilih Satuan</option>
                      {UNITS.map(unit => (
                        <option key={unit.id} value={unit.id}>
                          {unit.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Deskripsi</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-white'}`}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className={`inline-flex items-center text-sm ${isDarkMode ? 'text-red-400 hover:text-red-600' : 'text-red-500 hover:text-red-700'}`}
                  >
                    <TrashIcon className="h-5 w-5 mr-2" />
                    Hapus Barang
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 "></div>
                  Kirim Permintaan
                </div>
              ) : (
                'Kirim Permintaan'
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Request;