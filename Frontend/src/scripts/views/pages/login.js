/* eslint-disable linebreak-style */
import { createTemplateLogin } from '../templates/template-creator.js';
import routes from '../../routes/routes.js';
const Login = {
  async render() {
    return `
      <div class="app"></div>
    `;
  },
  async afterRender() {
    const login = document.querySelector('.app');
    login.innerHTML = createTemplateLogin();

    const loginForm = document.querySelector('.button1');
    console.log('Login form found:', loginForm); // Pastikan form ditemukan

    loginForm.addEventListener('click', async (e) => {
      e.preventDefault(); // Mencegah reload halaman
      console.log('Form submitted'); // Log saat form disubmit

      const username = document.querySelector('.input-field[placeholder="Username"]').value;
      const password = document.querySelector('.input-field[placeholder="Password"]').value;

      if (!username || !password) {
        alert('Please fill in both fields');
        return;
      }
      const header = document.querySelector('header');
      header.style.display = 'grid';
      const page = routes['/home'];
      login.innerHTML = await page.render();
      await page.afterRender();
      console.log('Username:', username);
      console.log('Password:', password);
    });

    //sigup
    const signup = document.querySelector('.button2');
    signup.addEventListener('click', async (e) => {
      e.preventDefault();
      const page = routes['/signup'];

      // Ganti this._content dengan login
      login.innerHTML = await page.render();
      await page.afterRender();
    });
  }
};

export default Login;