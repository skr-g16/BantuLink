import React from "react";
import { FaRegCheckCircle } from "react-icons/fa"; // Import ikon dari react-icons

export const About = () => {
  return (
    <div className="bg-gray-50 py-10 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">
          Tentang BantuLink
        </h1>
        <p className="text-lg text-gray-700 text-center mb-6 px-4">
          BantuLink adalah platform donasi yang menghubungkan relawan dengan korban yang membutuhkan bantuan. Kami percaya bahwa setiap orang berhak mendapatkan bantuan, dan kami berkomitmen untuk membuat proses donasi menjadi lebih mudah dan transparan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform duration-300 hover:shadow-2xl">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Misi Kami</h2>
            <p className="text-gray-700 mb-4">
              Misi kami adalah untuk memfasilitasi koneksi antara mereka yang ingin memberikan bantuan dan mereka yang membutuhkannya. Kami berusaha untuk menciptakan komunitas yang peduli dan saling mendukung.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform duration-300 hover:shadow-2xl">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Bagaimana Cara Kerjanya?</h2>
            <ol className="list-decimal list-inside text-gray-700">
              <li className="mb-2">Daftar sebagai Relawan atau Korban.</li>
              <li className="mb-2">Temukan Kebutuhan yang ada.</li>
              <li className="mb-2">Berikan Bantuan sesuai kebutuhan yang diposting.</li>
            </ol>
          </div>
        </div>

        <h2 className="text-3xl font-semibold text-center mt-10 mb-4 text-gray-800">Mengapa Memilih BantuLink?</h2>
        <ul className="list-disc list-inside mx-auto  text-gray-700 mb-8 space-y-2">
          <li className="flex items-center">
            <FaRegCheckCircle className="w-5 h-5 text-blue-500 mr-2" />
            Transparansi: Kami menyediakan informasi yang jelas tentang setiap donasi.
          </li>
          <li className="flex items-center">
            <FaRegCheckCircle className="w-5 h-5 text-blue-500 mr-2" />
            Komunitas: Bergabunglah dengan komunitas yang peduli dan saling mendukung.
          </li>
          <li className="flex items-center">
            <FaRegCheckCircle className="w-5 h-5 text-blue-500 mr-2" />
            Mudah Digunakan: Platform kami dirancang untuk memudahkan semua orang dalam memberikan dan menerima bantuan dengan cara yang sederhana dan efisien.
          </li>
          
        </ul>

        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform duration-300 hover:shadow-2xl">
          <h2 className="text-3xl font-semibold mb-4">Bergabunglah dengan Kami!</h2>
          <p className="text-gray-700 mb-4">
            Mari bersama-sama kita wujudkan dunia yang lebih baik. Bergabunglah dengan kami sebagai relawan atau bantu kami menyebarkan informasi tentang korban yang membutuhkan bantuan.
          </p>
          <p className="text-gray-700 mb-4">
            Untuk informasi lebih lanjut, silakan hubungi kami di <a href="mailto:info@bantulink.com" className="text-blue-500 hover:underline">info@bantulink.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};