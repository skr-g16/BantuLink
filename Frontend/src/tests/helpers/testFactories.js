/* eslint-disable linebreak-style */
import LikeButtonInitiator from '../../scripts/utils/like-button-initiator';

const createLikeButtonPresenterWithRestaurant =  async () => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButton'),
    restaurant: {
      id: 1,
    },
  });
};
export { createLikeButtonPresenterWithRestaurant };