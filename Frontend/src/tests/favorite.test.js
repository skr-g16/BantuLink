/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
// likeButtonInitiator.test.js
import LikeButtonInitiator from '../scripts/utils/like-button-initiator'; // Sesuaikan dengan path yang benar
import FavoritRestaurantIdb from '../scripts/data/favorit-restaurant-db';
import * as TestFactories from './helpers/testFactories';
if (typeof structuredClone !== 'function') {
  global.structuredClone = (value) => {
    return JSON.parse(JSON.stringify(value));
  };
}

describe('Liking A Restaurant', () => {
  const addButtonContainer = ()  => {
    document.body.innerHTML = '<div id="likeButton"></div>';
  };
  beforeEach(async () => {
    addButtonContainer();
    await FavoritRestaurantIdb.deleteRestaurant(1);
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    // document.body.innerHTML = '<div id="likeButton"></div>';

    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });


    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  it('should show the unlike button when the restaurant has been liked before', async () => {
    // document.body.innerHTML = '<div id="likeButton"></div>';

    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });


    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    // document.body.innerHTML = '<div id="likeButton"></div>';

    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const  restaurant = await FavoritRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });
    await  FavoritRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already liked', async () => {
    // document.body.innerHTML = '<div id="likeButton"></div>';

    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });


    await FavoritRestaurantIdb.putRestaurant({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoritRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);

    await FavoritRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    // document.body.innerHTML = '<div id="likeButton"></div>';

    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButton'),
      restaurant: {},
    });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoritRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});

describe('Unliking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButton"></div>';
  };
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoritRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoritRestaurantIdb.deleteRestaurant(1);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
  });

  it('should display like widget when the restaurant has been unliked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();

  });

  it('should be able to remove liked restaurant from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoritRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error when user click unlike widget if the unliked restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    await FavoritRestaurantIdb.deleteRestaurant(1);
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoritRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
