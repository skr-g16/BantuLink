import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = ({ isLoggedIn, onLogout }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const userId = localStorage.getItem('userId');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        if (onLogout) onLogout();
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50 transition-all duration-300">
            <nav className="container mx-auto flex items-center justify-between p-4">
                <Link className="text-2xl font-bold text-gray-800 hover:text-orange-500 transition-colors duration-300" to="/">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                        BantuLink
                    </span>
                </Link>
                
                <div className={`hamburger ${menuOpen ? 'open' : ''} md:hidden cursor-pointer p-2 rounded-lg hover:bg-gray-100`} 
                    onClick={toggleMenu}>
                    <div className="w-6 h-0.5 bg-gray-600 mb-1.5 rounded-full transition-all"></div>
                    <div className="w-6 h-0.5 bg-gray-600 mb-1.5 rounded-full transition-all"></div>
                    <div className="w-6 h-0.5 bg-gray-600 rounded-full transition-all"></div>
                </div>

                <ul className={`absolute md:static md:bg-transparent w-full md:w-auto transition-all left-0 duration-300 ease-in-out 
                    ${menuOpen ? 'top-16 opacity-100 bg-white/95 shadow-lg' : 'top-[-200px] opacity-0'} 
                    md:flex md:opacity-100 md:top-0 md:items-center md:space-x-2`}>
                    {!isLoggedIn ? (
                        <li>
                            <NavLink to="/login" 
                                className="block px-5 py-2 text-gray-700 font-medium rounded-lg hover:bg-orange-50 hover:text-orange-500 transition-all">
                                Login
                            </NavLink>
                        </li>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/" 
                                    className={({isActive}) => 
                                        `block px-5 py-2 font-medium rounded-lg transition-all ${
                                            isActive ? 'bg-orange-50 text-orange-500' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-500'
                                        }`}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about"
                                    className={({isActive}) => 
                                        `block px-5 py-2 font-medium rounded-lg transition-all ${
                                            isActive ? 'bg-orange-50 text-orange-500' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-500'
                                        }`}>
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/profile/${userId}`}
                                    className={({isActive}) => 
                                        `block px-5 py-2 font-medium rounded-lg transition-all ${
                                            isActive ? 'bg-orange-50 text-orange-500' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-500'
                                        }`}>
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/login" onClick={handleLogout}
                                    className="block px-5 py-2 text-gray-700 font-medium rounded-lg hover:bg-red-50 hover:text-red-500 transition-all">
                                    Logout
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};
    