import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }

    console.log('Username:', username);
    console.log('Password:', password);
    
    // Lakukan logika autentikasi di sini
    onLogin(); // Panggil fungsi untuk mengubah status login

    navigate('/'); // Navigasi ke halaman setelah login berhasil
  };

  return (
    <div id="app">
      <div className="card">
        <div className="card2">
          <form className="form" id="loginForm" onSubmit={handleLogin}>
            <p id="heading">Login</p>
            <div className="field">
            <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16"
                xmlns="http://www.w3.org/2000/svg" className="input-icon">
                <path
                    d="M8 0a4 4 0 1 1 0 8A4 4 0 0 1 8 0zm0 10a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z">
                </path>
            </svg>
              <input type="text" className="input-field" placeholder="Username" autoComplete="off"
                value={username} onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="field">
            <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16"
                            xmlns="http://www.w3.org/2000/svg" className="input-icon">
                            <path
                                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z">
                            </path>
                        </svg>
              <input type="password" className="input-field" placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="btn">
              <button type="submit" className="button1">Login</button>
              <button type="button" className="button2" onClick={() => navigate('/signup')}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};