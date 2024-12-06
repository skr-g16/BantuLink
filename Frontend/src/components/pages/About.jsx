import { FaRegCheckCircle, FaHandHoldingHeart, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
export const About = ({ isDarkMode }) => {
  const bgClass = isDarkMode
    ? "bg-gradient-to-b from-gray-900 to-black text-gray-300"
    : "bg-gradient-to-b from-gray-50 to-white text-gray-700";

  const heroTitleClass = isDarkMode
    ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
    : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600";

  const sectionBgClass = isDarkMode
    ? "bg-gray-800 text-gray-300"
    : "bg-white text-gray-600";

  const whyChooseBgClass = isDarkMode
    ? "bg-gradient-to-r from-gray-800 to-gray-700"
    : "bg-gradient-to-r from-blue-50 to-purple-50";

  const ctaBgClass = isDarkMode
    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white";

  return (
    <div className={`min-h-screen py-20 ${bgClass}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-6xl font-extrabold ${heroTitleClass} mb-6`}>
            Tentang BantuLink
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            BantuLink adalah platform donasi yang menghubungkan relawan dengan korban yang membutuhkan bantuan. Kami percaya bahwa setiap orang berhak mendapatkan bantuan.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className={`group rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ${sectionBgClass}`}>
            <div className="flex items-center mb-6">
              <FaHandHoldingHeart className={`w-8 h-8 ${isDarkMode ? "text-purple-400" : "text-blue-500"} mr-4`} />
              <h2 className="text-3xl font-bold">Misi Kami</h2>
            </div>
            <p className="leading-relaxed">
              Misi kami adalah untuk memfasilitasi koneksi antara mereka yang ingin memberikan bantuan dan mereka yang membutuhkannya. Kami berusaha untuk menciptakan komunitas yang peduli dan saling mendukung.
            </p>
          </div>

          <div className={`group rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ${sectionBgClass}`}>
            <div className="flex items-center mb-6">
              <FaUsers className={`w-8 h-8 ${isDarkMode ? "text-blue-400" : "text-purple-500"} mr-4`} />
              <h2 className="text-3xl font-bold">Cara Kerja</h2>
            </div>
            <ol className="space-y-4">
              {['Daftar sebagai Relawan atau Korban', 'Temukan Kebutuhan yang ada', 'Berikan Bantuan sesuai kebutuhan'].map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold ${isDarkMode ? "bg-blue-800 text-blue-400" : "bg-purple-100 text-purple-600"}`}>
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className={`rounded-3xl p-10 mb-16 ${whyChooseBgClass}`}>
          <h2 className="text-4xl font-bold text-center mb-10">
            Mengapa Memilih BantuLink?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              'Transparansi dalam setiap donasi',
              'Komunitas yang peduli dan mendukung',
              'Platform yang mudah digunakan'
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <FaRegCheckCircle className={`w-6 h-6 ${isDarkMode ? "text-green-400" : "text-green-500"} mt-1 flex-shrink-0`} />
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`rounded-3xl p-10 text-center ${ctaBgClass}`}>
          <h2 className="text-4xl font-bold mb-6">Bergabunglah dengan Kami!</h2>
          <p className="text-xl mb-8 opacity-90">
            Mari bersama-sama kita wujudkan dunia yang lebih baik. Jadilah bagian dari perubahan positif.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <Link to="/login" className={`px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all ${isDarkMode ? "bg-gray-800 text-purple-400 hover:bg-purple-700 hover:text-white" : "bg-white text-blue-600"}`}>
              Donasi Sekarang
            </Link>
            <a href="mailto:info@bantulink.com" className="hover:underline">
              info@bantulink.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
