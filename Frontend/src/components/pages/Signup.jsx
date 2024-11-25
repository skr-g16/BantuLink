import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser , FaPhone, FaEnvelope, FaLock, FaHome, FaTransgender } from 'react-icons/fa'; // Mengimpor ikon dari


export const Signup = () => {
const [namaLengkap, setNamaLengkap] = useState("");
const [telepon, setTelepon] = useState("");
const [namaPengguna, setNamaPengguna] = useState("");
const [alamat, setAlamat] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const [jenisKelamin, setJenisKelamin] = useState("");

const navigate = useNavigate();

const handleSubmit = (e) => {
e.preventDefault();
console.log('Nama Lengkap: ', namaLengkap);
console.log('Telepon: ', telepon);
console.log('Alamat: ', alamat);
console.log('Password: ', password);
console.log('Email: ', email);
console.log('Jenis Kelamin: ', jenisKelamin); // Menampilkan jenis kelamin

navigate('/login');
};

return (
<div className="flex items-center pt-20 justify-center min-h-screen bg-gradient-to-r">
  <div className="bg-white shadow-2xl rounded-lg p-10 max-w-sm w-full transition-transform transform">
    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Daftar Akun</h2>
    <form className="space-y-6" id="signupForm" onSubmit={handleSubmit}>
      <div className="flex items-center border border-gray-300 rounded-lg p-3 transition duration-300 hover:shadow-lg">
        <FaUser className="text-gray-400 mr-2" />
        <input id="namaLengkap" type="text"
          className="flex-1 border-none bg-transparent focus:ring-0 focus:outline-none text-gray-800 placeholder-gray-400"
          placeholder="Nama Lengkap" value={namaLengkap} onChange={(e)=> setNamaLengkap(e.target.value)}
        required
        />
      </div>
      <div className="flex items-center border border-gray-300 rounded-lg p-3 transition duration-300 hover:shadow-lg">
        <FaPhone className="text-gray-400 mr-2" />
        <input id="telepon" type="tel"
          className="flex-1 border-none bg-transparent focus:ring-0 focus:outline-none text-gray-800 placeholder-gray-400"
          placeholder="Telepon" value={telepon} onChange={(e)=> setTelepon(e.target.value)}
        required
        />
      </div>
      <div className="flex items-center border border-gray-300 rounded-lg p-3 transition duration-300 hover:shadow-lg">
        <FaUser className="text-gray-400 mr-2" />
        <input id="namaPengguna" type="text"
          className="flex-1 border-none bg-transparent focus:ring-0 focus:outline-none text-gray-800 placeholder-gray-400"
          placeholder="Nama Pengguna" value={namaPengguna} onChange={(e)=> setNamaPengguna(e.target.value)}
        required
        />
      </div>

      <div className="flex items-center border border-gray-300 rounded-lg p-3 transition duration-300 hover:shadow-lg">
        <FaEnvelope className="text-gray-400 mr-2" />
        <input id="email" type="email"
          className="flex-1 border-none bg-transparent focus:ring-0 focus:outline-none text-gray-800 placeholder-gray-400"
          placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}
        required
        />
      </div>
      <div className="flex items-center border border-gray-300 rounded-lg p-3 transition duration-300 hover:shadow-lg">
        <FaLock className="text-gray-400 mr-2" />
        <input id="password" type="password"
          className="flex-1 border-none bg-transparent focus:ring-0 focus:outline-none text-gray-800 placeholder-gray-400"
          placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}
        required
        />
      </div>
      <div className="flex items-center border border-gray-300 rounded-lg p-3 transition duration-300 hover:shadow-lg">
        <FaHome className="text-gray-400 mr-2" />

        <div className="flex-1">
          <select id="alamat"
            className="w-full border-none bg-transparent   focus:ring-0 focus:outline-none text-gray-800 placeholder-gray-400"
            value={alamat} onChange={(e)=> setAlamat(e.target.value)}
            required
            >
            <option value="" disabled>Alamat</option>
            <option value="Jl. Merpati No. 10, Jakarta">Jl. Merpati No. 10, Jakarta</option>
            <option value="Jl. Kenari No. 5, Bandung">Jl. Kenari No. 5, Bandung</option>
            <option value="Jl. Cendana No. 20, Surabaya">Jl. Cendana No. 20, Surabaya</option>
            <option value="Jl. Bunga No. 15, Yogyakarta">Jl. Bunga No. 15, Yogyakarta</option>
            <option value="Jl. Melati No. 8, Semarang">Jl. Melati No. 8, Semarang</option>
            <option value="Jl. Anggrek No. 12, Bali">Jl. Anggrek No. 12, Bali</option>
            <option value="Jl. Kamboja No. 3, Medan">Jl. Kamboja No. 3, Medan</option>
            <option value="Jl. Beringin No. 7, Makassar">Jl. Beringin No. 7, Makassar</option>
            <option value="Jl. Flamboyan No. 9, Palembang">Jl. Flamboyan No. 9, Palembang</option>
          </select>
        </div>
      </div>
      <div className="flex items-center border border-gray-300 rounded-lg p-3 transition duration-300 hover:shadow-lg">
        <FaTransgender className="text-gray-400 mr-2" />

        <div className="flex-1">
          <select id="jenisKelamin"
            className="w-full border-none bg-transparent focus:ring-0 focus:outline-none text-gray-800 placeholder-gray-400"
            value={jenisKelamin} onChange={(e)=> setJenisKelamin(e.target.value)}
            required
            >
            <option value="" disabled>Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold py-3 rounded-lg transition duration-300 hover:shadow-xl transform hover:translate-y-1">
          Daftar
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <button type="button" className="text-orange-600 font-semibold hover:underline" onClick={()=>
          navigate('/login')}
          >
          Sudah punya akun? Masuk
        </button>
      </div>
    </form>
  </div>
</div>
);
};