/* eslint-disable linebreak-style */
import Home from '../views/pages/dashboard.js';
import Favorite from '../views/pages/favorite.js';
import Detail from '../views/pages/detail.js';

const routes = {
  '/': Home,
  '/home': Home,
  '/favorite': Favorite,
  '/detail/:id': Detail
};
export default routes;