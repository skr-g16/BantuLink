/* eslint-disable linebreak-style */
const DrawerInitiator = {
  init({ button, drawer, content }) {
    button.addEventListener('click', (e) => {
      this._toggleDrawer(e, drawer);
    });

    content.addEventListener('click', (e) => {
      this._closeDrawer(e, drawer);
    });
  },

  _toggleDrawer(e, drawer) {
    e.preventDefault();
    drawer.classList.toggle('open');
  },
  _closeDrawer(e, drawer) {
    e.preventDefault();
    drawer.classList.remove('open');
  }
};

export default DrawerInitiator;