import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope, FaLock, FaHome, FaTransgender } from 'react-icons/fa';
import { APISource } from "../../data/source-api";

export const Signup = () => {
  const [namaLengkap, setNamaLengkap] = useState("");
  const [telepon, setTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaLengkap || !telepon || !alamat || !password || !email || !jenisKelamin) {
      alert('Silakan isi semua kolom');
      return;
    }

    setLoading(true);

    try {
      const {userId} = await APISource.register(namaLengkap, email, password, telepon, jenisKelamin, alamat);
      console.log(userId);
      if (userId) {
        alert('Pendaftaran berhasil');
        navigate('/login');
        localStorage.setItem('userId', userId);
      }
    } catch (error) {
      alert(error.message || 'Pendaftaran gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full m-4 transition-all duration-300 hover:shadow-3xl">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text">
          Buat Akun Baru
        </h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="group">
            <div className="flex items-center border-2 border-gray-200 rounded-xl p-3 transition-all duration-300 hover:border-orange-400 focus-within:border-orange-400 focus-within:shadow-md">
              <FaUser className="text-gray-400 group-hover:text-orange-400 w-5 h-5" />
              <input
                id="namaLengkap"
                type="text"
                className="flex-1 ml-3 border-none bg-transparent focus:ring-0 focus:outline-none text-gray-700"
                placeholder="Nama Lengkap"
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="group">
            <div className="flex items-center border-2 border-gray-200 rounded-xl p-3 transition-all duration-300 hover:border-orange-400 focus-within:border-orange-400 focus-within:shadow-md">
              <FaEnvelope className="text-gray-400 group-hover:text-orange-400 w-5 h-5" />
              <input
                id="email"
                type="email"
                className="flex-1 ml-3 border-none bg-transparent focus:ring-0 focus:outline-none text-gray-700"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="group">
            <div className="flex items-center border-2 border-gray-200 rounded-xl p-3 transition-all duration-300 hover:border-orange-400 focus-within:border-orange-400 focus-within:shadow-md">
              <FaLock className="text-gray-400 group-hover:text-orange-400 w-5 h-5" />
              <input
                id="password"
                type="password"
                className="flex-1 ml-3 border-none bg-transparent focus:ring-0 focus:outline-none text-gray-700"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="group">
            <div className="flex items-center border-2 border-gray-200 rounded-xl p-3 transition-all duration-300 hover:border-orange-400 focus-within:border-orange-400 focus-within:shadow-md">
              <FaPhone className="text-gray-400 group-hover:text-orange-400 w-5 h-5" />
              <input
                id="telepon"
                type="tel"
                className="flex-1 ml-3 border-none bg-transparent focus:ring-0 focus:outline-none text-gray-700"
                placeholder="Telepon"
                value={telepon}
                onChange={(e) => setTelepon(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="group">
            <div className="flex items-center border-2 border-gray-200 rounded-xl p-3 transition-all duration-300 hover:border-orange-400 focus-within:border-orange-400 focus-within:shadow-md">
              <FaHome className="text-gray-400 group-hover:text-orange-400 w-5 h-5" />
              <input
                id="alamat"
                type="text"
                className="flex-1 ml-3 border-none bg-transparent focus:ring-0 focus:outline-none text-gray-700"
                placeholder="Jl. Merpati No. 10, Jakarta"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="group">
            <div className="flex items-center border-2 border-gray-200 rounded-xl p-3 transition-all duration-300 hover:border-orange-400 focus-within:border-orange-400 focus-within:shadow-md">
              <FaTransgender className="text-gray-400 group-hover:text-orange-400 w-5 h-5" />
              <select
                id="jenisKelamin"
                className="flex-1 ml-3 border-none bg-transparent focus:ring-0 focus:outline-none text-gray-700"
                value={jenisKelamin}
                onChange={(e) => setJenisKelamin(e.target.value)}
                required
              >
                <option value="" disabled>Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:opacity-90 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Mendaftar...
              </div>
            ) : (
              'Daftar Sekarang'
            )}
          </button>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Sudah punya akun?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-orange-500 font-semibold hover:text-orange-600 transition-colors duration-300"
              >
                Masuk di sini
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;