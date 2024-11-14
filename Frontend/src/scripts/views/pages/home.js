/* eslint-disable linebreak-style */
import { createTemplateHome } from '../templates/template-creator.js';
const Home = {
  async render() {
    return `
            <div class="homes"></div>
        `;
  },
  async afterRender() {
    const homeElement = document.querySelector('.homes');
    homeElement.innerHTML = createTemplateHome();
  }
};

export default Home;