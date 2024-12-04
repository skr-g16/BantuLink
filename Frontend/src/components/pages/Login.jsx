import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaUser, FaLock } from 'react-icons/fa';
import { APISource } from '../../data/source-api';
import { jwtDecode } from 'jwt-decode';

export const Login = ({ onLogin }) => {
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

        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken',refreshToken);



        const decodedToken = jwtDecode(accessToken);
        console.log('Decoded Token:', decodedToken);
        const userId = decodedToken.id;
        console.log('User ID:', userId);
        localStorage.setItem('userId', userId);




        onLogin();
        navigate('/');
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














    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="bg-white backdrop-blur-sm bg-opacity-95 shadow-2xl rounded-2xl p-8 max-w-md w-full m-4 transition-all duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text">
            Selamat Datang Kembali
          </h2>
          <p className="text-gray-500 mt-2">Masuk untuk melanjutkan perjalanan Anda</p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="group">
            <div className="flex items-center border-2 border-gray-200 rounded-xl p-4 transition-all duration-300 hover:border-orange-400 focus-within:border-orange-400 focus-within:shadow-md bg-white">
              <FaUser className="text-gray-400 group-hover:text-orange-400 w-5 h-5" />
              <input
                type="email"
                className="flex-1 ml-3 border-none bg-transparent focus:ring-0 focus:outline-none text-gray-700 placeholder-gray-400"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="group">
            <div className="flex items-center border-2 border-gray-200 rounded-xl p-4 transition-all duration-300 hover:border-orange-400 focus-within:border-orange-400 focus-within:shadow-md bg-white">
              <FaLock className="text-gray-400 group-hover:text-orange-400 w-5 h-5" />
              <input
                type="password"
                className="flex-1 ml-3 border-none bg-transparent focus:ring-0 focus:outline-none text-gray-700 placeholder-gray-400"
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Sedang Masuk...
              </div>
            ) : (
              'Masuk'
            )}
          </button>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Belum punya akun? {' '}
              <button
                type="button"

                onClick={() => navigate('/signup')}
                className="text-orange-500 font-semibold hover:text-orange-600 transition-colors duration-300"
              >

                Buat akun
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );

};


export default Login;