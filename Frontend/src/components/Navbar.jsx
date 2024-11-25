import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = ({ isLoggedIn, onLogout }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-orange-400 bg-opacity-50 backdrop-blur-sm shadow-lg z-50 transition-all duration-300">
            <nav className="container mx-auto flex items-center justify-between p-4">
                <Link className="text-3xl font-bold text-white">BantuLink</Link>
                <div
                    className={`hamburger ${menuOpen ? 'open' : ''} md:hidden`}
                    onClick={toggleMenu}
                    aria-expanded={menuOpen}
                    aria-label="Toggle menu"
                >
                    <div className="w-6 h-0.5 bg-white mb-1 transition-transform duration-300 ease-in-out" style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
                    <div className="w-6 h-0.5 bg-white mb-1 transition-opacity duration-300 ease-in-out" style={{ opacity: menuOpen ? 0 : 1 }}></div>
                    <div className="w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out" style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></div>
                </div>
                <ul className={`absolute md:static md:bg-transparent w-full md:w-auto transition-all right-1 duration-300 ease-in-out ${menuOpen ? 'top-16 right-0 opacity-100' : 'top-[-200px] opacity-0'} md:flex md:opacity-100 md:top-0`}>
                    {!isLoggedIn ? (
                        <li className="md:mr-6">
                            <NavLink
                                to="/login"
                                className={`block py-2 px-4 h-11 text-white font-bold hover:bg-orange-400 hover:rounded transition ${menuOpen ? 'bg-orange-300' : ''} md:bg-transparent md:hover:bg-orange-200`}
                            >Login</NavLink>
                        </li>
                    ) : (
                        <>
                          <li className="md:mr-6">
                                <NavLink
                                    to="/"
                                    className={`block py-2 px-4 h-11 text-white font-bold hover:bg-orange-400 hover:rounded transition ${menuOpen ? 'bg-orange-300' : ''} md:bg-transparent md:hover:bg-orange-200`}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="md:mr-6">
                                <NavLink
                                    to="/about"
                                    className={`block py-2 px-4 h-11 text-white font-bold hover:bg-orange-400 hover:rounded transition ${menuOpen ? 'bg-orange-300' : ''} md:bg-transparent md:hover:bg-orange-200`}
                                >
                                    About
                                </NavLink>
                            </li>

                            <li className="md:mr-6">
                                <NavLink
                                    to="/login"
                                    id="logoutBtn"
                                    className={`block py-2 px-4 h-11 text-white font-bold hover:bg-red-500 hover:rounded transition ${menuOpen ? 'bg-orange-300' : ''} md:bg-transparent md:hover:bg-red-400`}
                                    onClick={onLogout}
                                >
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