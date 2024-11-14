/* eslint-disable linebreak-style */
import { createTemplateSignup } from '../templates/template-creator.js';
import routes from '../../routes/routes.js';
import { async } from 'regenerator-runtime';
const Signup = {

  async render() {
    return `
      <div class="app"></div>`;
  },
  async afterRender() {
    const signup = document.querySelector('.app');
    signup.innerHTML = createTemplateSignup();

    const signupForm = document.querySelector('.button1');
    signupForm.addEventListener('click', async (e) => {
      e.preventDefault();
      console.log('Form submitted');
      const first = document.querySelector('#firstName').value;
      const last = document.querySelector('#lastName').value;
      const password = document.querySelector('.input-field[placeholder="Password"]').value;
      const email = document.querySelector('.input-field[placeholder="Email"]').value;

      if (!first || !last || !password || !email) {
        alert('Please fill in all fields');
        return;
      }
      const header = document.querySelector('.app-bar');
      header.style.display = 'grid';

      const page = routes['/login'];
      signup.innerHTML = await page.render();
      await page.afterRender();
      console.log('First Name:', first);
      console.log('Last Name:', last);
      console.log('Password:', password);
      console.log('Email:', email);
    });

    const login = document.querySelector('.button2');
    login.addEventListener('click', async (e) => {
      e.preventDefault();
      const page = routes['/login'];
      signup.innerHTML = await page.render();
      await page.afterRender();
    });
  }
};

export default Signup;