import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser , FaLock } from 'react-icons/fa'; // Mengimpor ikon dari react-icons

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Silakan isi semua kolom');
      return;
    }

    console.log('Username:', username);
    console.log('Password:', password);
    
    // Logika autentikasi bisa ditambahkan di sini
    onLogin(); // Panggil fungsi untuk mengubah status login

    navigate('/'); // Arahkan ke halaman utama setelah login berhasil
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r">
      <div className="bg-white shadow-2xl rounded-lg p-10 max-w-sm w-full transition-transform transform">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Selamat Datang Kembali</h2>
        <form className="space-y-6" id="loginForm" onSubmit={handleLogin}>
          <div className="flex items-center border border-gray-300 rounded-lg p-3 transition duration-300 hover:shadow-lg">
            <FaUser  className="text-gray-400 mr-2" /> {/* Ikon untuk username */}
            <input 
              type="text" 
              className="flex-1 border-none bg-transparent focus:ring-0 focus:outline-none text-gray-800 placeholder-gray-400" 
              placeholder="Username" 
              autoComplete="off"
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg p-3 transition duration-300 hover:shadow-lg">
            <FaLock className="text-gray-400 mr-2" /> {/* Ikon untuk password */}
            <input 
              type="password" 
              className="flex-1 border-none bg-transparent focus:ring-0 focus:outline-none text-gray-800 placeholder-gray-400" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div className="flex justify-center mt-4">
            <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold py-3 rounded-lg transition duration-300 hover:shadow-xl transform hover:translate-y-1">
              Login
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <p>
              Belum punya akun?&nbsp;
            <button type="button" className="text-orange-600 font-semibold hover:underline" onClick={() => navigate('/signup')}>
              Daftar
            </button>
            </p>
            
          </div>
        </form>
      </div>
    </div>
  );
};