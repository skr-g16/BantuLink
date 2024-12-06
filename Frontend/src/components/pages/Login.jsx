import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { APISource } from '../../data/source-api';
import { ToastContainer, toast } from 'react-toastify';

export const Login = ({ onLogin, isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Silakan isi semua kolom');
      return;
    }

    setLoading(true);

    try {
      const data = await APISource.login(email, password);
      if (data) {
        console.log('Login berhasil:', data);
        onLogin();
        toast.success('Login berhasil');
        navigate('/beranda');
      } else {
        alert(data.message || 'Login gagal');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  return (
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
            : 'bg-white'
        } backdrop-blur-sm shadow-2xl rounded-2xl p-8 max-w-md w-full m-4 transform transition-transform `}
      >
        <div className="text-center mb-8">
          <h2
            className={`text-3xl font-extrabold ${
              isDarkMode
                ? 'bg-gradient-to-r from-gray-200 to-gray-400'
                : 'bg-gradient-to-r from-orange-500 to-yellow-500'
            } text-transparent bg-clip-text`}
          >
            Selamat Datang Kembali
          </h2>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Masuk untuk melanjutkan perjalanan Anda
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="group">
            <div
              className={`flex items-center border-2 rounded-xl p-4 transition-all duration-300 ${
                isDarkMode
                  ? 'border-gray-700 bg-gray-700 hover:border-gray-500 focus-within:border-gray-500 focus-within:shadow-md'
                  : 'border-gray-200 bg-white hover:border-orange-400 focus-within:border-orange-400 focus-within:shadow-md'
              }`}
            >
              <FaUser
                className={`w-5 h-5 transition-transform duration-300 ${
                  isDarkMode
                    ? 'text-gray-400 group-hover:text-gray-300 group-focus-within:rotate-12'
                    : 'text-gray-400 group-hover:text-orange-400 group-focus-within:rotate-12'
                }`}
              />
              <input
                type="email"
                className={`flex-1 ml-3 border-none bg-transparent focus:ring-0 focus:outline-none ${
                  isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-700 placeholder-gray-400'
                }`}
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="group">
            <div
              className={`flex items-center border-2 rounded-xl p-4 transition-all duration-300 ${
                isDarkMode
                  ? 'border-gray-700 bg-gray-700 hover:border-gray-500 focus-within:border-gray-500 focus-within:shadow-md'
                  : 'border-gray-200 bg-white hover:border-orange-400 focus-within:border-orange-400 focus-within:shadow-md'
              }`}
            >
              <FaLock
                className={`w-5 h-5 transition-transform duration-300 ${
                  isDarkMode
                    ? 'text-gray-400 group-hover:text-gray-300 group-focus-within:rotate-12'
                    : 'text-gray-400 group-hover:text-orange-400 group-focus-within:rotate-12'
                }`}
              />
              <input
                type="password"
                className={`flex-1 ml-3 border-none bg-transparent focus:ring-0 focus:outline-none ${
                  isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-700 placeholder-gray-400'
                }`}
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              isDarkMode
                ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-white hover:from-orange-600 hover:to-yellow-600'
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
                Sedang Masuk...
              </div>
            ) : (
              'Masuk'
            )}
          </button>

          <div className="text-center mt-6">
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Belum punya akun?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className={`font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-orange-500 hover:text-orange-600' : 'text-orange-500 hover:text-orange-600'
                }`}
              >
                Buat akun
              </button>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default Login;
