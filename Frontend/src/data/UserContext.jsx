import React, { createContext, useState, useContext } from 'react';

// Context
const UserContext = createContext();

// Provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Menyimpan data user, termasuk ID

    const login = (userData) => {
        setUser(userData); // Simpan data user saat login
        localStorage.setItem('user', JSON.stringify(userData)); // Opsional: persist data ke localStorage
    };

    const logout = () => {
        setUser(null); // Hapus data user saat logout
        localStorage.removeItem('user'); // Hapus dari localStorage
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook untuk akses context
export const useUser = () => useContext(UserContext);
