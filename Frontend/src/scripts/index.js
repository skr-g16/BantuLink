import 'regenerator-runtime';
import '../style/style.css';
import swRegister from './utils/sw-register.js';
import loadLoginPage from './views/pages/login.js';
import loadSignupPage from './views/pages/signup.js';

// window.addEventListener('hashchange', () => {
//   app.renderPage();
// });

window.addEventListener('load', () => {
  swRegister();

// Fungsi untuk memuat konten berdasarkan halaman
const loadPage = (page) => {
  const app = document.getElementById('app');
  if (page === 'login') {
    app.innerHTML = `
            <div class="card" id="loginCard"></div>
        `;
    // Memanggil fungsi dari login.js untuk memuat halaman login
    loadLoginPage(loadPage); // Kirim loadPage sebagai parameter
  } else if (page === 'home') {
    app.innerHTML = `
            <div>
                <h1>Welcome to Home Page</h1>
                <button onclick="loadPage('login')">Logout</button>
            </div>
        `;
  } else if (page === 'signup') {
    app.innerHTML = `
            <div class="card" id="signupCard"></div>
        `;
        loadSignupPage(loadPage);
  } else if (page === 'forgot') {
    app.innerHTML = `
            <div>
                <h1>Forgot Password Page</h1>
                <button onclick="loadPage('login')">Back to Login</button>
            </div>
        `;
  }
};
window.loadPage = loadPage;
// Muat halaman login secara default
loadPage('login');
});