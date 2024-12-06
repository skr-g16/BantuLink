import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope, FaLock, FaHome, FaTransgender } from 'react-icons/fa';
import { APISource } from "../../data/source-api";
import { toast, ToastContainer } from 'react-toastify';

export const Signup = ({ isDarkMode }) => {
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
      const { userId } = await APISource.register(namaLengkap, email, password, telepon, jenisKelamin, alamat);
      console.log(userId);
      if (userId) {
        toast.success('Pendaftaran berhasil');
        navigate('/login');
        localStorage.setItem('userId', userId);
        toast.success('Pendaftaran berhasil');
      }
    } catch (error) {
      alert(error.message || 'Pendaftaran gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`flex items-center justify-center min-h-screen ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'
            : 'bg-gradient-to-br from-orange-50 to-yellow-50'
        }`}
      >
        <div
          className={`${
            isDarkMode
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white'
              : 'bg-white text-gray-700'
          } shadow-2xl rounded-2xl p-8 max-w-md w-full m-4 transition-all duration-300 hover:shadow-3xl`}
        >
          <h2
            className={`text-3xl font-bold text-center mb-8 ${
              isDarkMode
                ? 'bg-gradient-to-r from-gray-200 to-gray-400'
                : 'bg-gradient-to-r from-orange-500 to-yellow-500'
            } text-transparent bg-clip-text`}
          >
            Buat Akun Baru
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="group">
              <div
                className={`flex items-center border-2 rounded-xl p-3 transition-all duration-300 ${
                  isDarkMode
                    ? 'border-gray-700 bg-gray-700 hover:border-gray-500 focus-within:border-gray-500 focus-within:shadow-md'
                    : 'border-gray-200 bg-white hover:border-orange-400 focus-within:border-orange-400 focus-within:shadow-md'
                }`}
              >
                <FaUser
                  className={`w-5 h-5 ${
                    isDarkMode
                      ? 'text-gray-400 group-hover:text-gray-300'
                      : 'text-gray-400 group-hover:text-orange-400'
                  }`}
                />
                <input
                  id="namaLengkap"
                  type="text"
                  className={`flex-1 ml-3 border-none bg-transparent focus:ring-0 focus:outline-none ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}
                  placeholder="Nama Lengkap"
                  value={namaLengkap}
                  onChange={(e) => setNamaLengkap(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Input lainnya */}
            {[ 
              { Icon: FaEnvelope, id: "email", type: "email", placeholder: "Email", value: email, setValue: setEmail },
              { Icon: FaLock, id: "password", type: "password", placeholder: "Password", value: password, setValue: setPassword },
              { Icon: FaPhone, id: "telepon", type: "tel", placeholder: "Telepon", value: telepon, setValue: setTelepon },
              { Icon: FaHome, id: "alamat", type: "text", placeholder: "Alamat", value: alamat, setValue: setAlamat },
            ].map(({ Icon, id, type, placeholder, value, setValue }, index) => (
              <div key={index} className="group">
                <div
                  className={`flex items-center border-2 rounded-xl p-3 transition-all duration-300 ${
                    isDarkMode
                      ? 'border-gray-700 bg-gray-700 hover:border-gray-500 focus-within:border-gray-500 focus-within:shadow-md'
                      : 'border-gray-200 bg-white hover:border-orange-400 focus-within:border-orange-400 focus-within:shadow-md'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isDarkMode
                        ? 'text-gray-400 group-hover:text-gray-300'
                        : 'text-gray-400 group-hover:text-orange-400'
                    }`}
                  />
                  <input
                    id={id}
                    type={type}
                    className={`flex-1 ml-3 border-none bg-transparent focus:ring-0 focus:outline-none ${
                      isDarkMode ? 'text-white' : 'text-gray-700'
                    }`}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                  />
                </div>
              </div>
            ))}

            <div className="group">
              <div
                className={`flex items-center border-2 rounded-xl p-3 transition-all duration-300 ${
                  isDarkMode
                    ? 'border-gray-700 bg-gray-700 hover:border-gray-500 focus-within:border-gray-500 focus-within:shadow-md'
                    : 'border-gray-200 bg-white hover:border-orange-400 focus-within:border-orange-400 focus-within:shadow-md'
                }`}
              >
                <FaTransgender
                  className={`w-5 h-5 ${
                    isDarkMode
                      ? 'text-gray-400 group-hover:text-gray-300'
                      : 'text-gray-400 group-hover:text-orange-400'
                  }`}
                />
                <select
                  id="jenisKelamin"
                  className={`flex-1 ml-3 border-none bg-transparent focus:ring-0 focus:outline-none ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}
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
              className={`w-full font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600'
                  : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div
                    className={`animate-spin rounded-full h-5 w-5 border-b-2 ${
                      isDarkMode ? 'border-gray-300' : 'border-white'
                    } mr-2`}
                  ></div>
                  Mendaftar...
                </div>
              ) : (
                'Daftar Sekarang'
              )}
            </button>

            <div className="text-center mt-6">
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Sudah punya akun?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className={`font-semibold transition-colors duration-300 ${
                    isDarkMode ? 'text-orange-500 hover:text-orange-600' : 'text-orange-500 hover:text-orange-600'
                  }`}
                >
                  Masuk di sini
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
