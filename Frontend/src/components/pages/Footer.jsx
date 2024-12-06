import { BsGithub } from "react-icons/bs";

export const Footer = ({ isDarkMode }) => {
    return (
        <footer className={`bg-gradient-to-r ${isDarkMode ? 'from-gray-800 to-gray-700' : 'from-gray-900 to-gray-800'} text-gray-200 py-8`}>
    <div className="container mx-auto text-center">
      <h2 className="text-lg font-semibold mb-4">Stay Connected</h2>
      <p className="mb-4">&copy; {new Date().getFullYear()} BantuLink. All rights reserved.</p>
      <p className="mb-4">Join us in making a difference in our community!</p>
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://github.com/skr-g16/BantuLink" target="_blank" aria-label="GitHub" className="text-gray-200 hover:text-gray-400 transition duration-200">
          <BsGithub className="w-8 h-8" />
        </a>
      </div>
    </div>
  </footer>
    );
};