import {
  ADD_ITEM,
  DELETE_ITEM,
} from './actions';

const INITIAL_STATE = {
  wishList: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  let wishList = [...state.wishList];
  let item = action.payload;

  switch (action.type) {

    // adding an item to the wishlisht, given the item value
    case ADD_ITEM:
      if (item.value && item.value !== '') {
        wishList.push({
          value: item.value,
          key: '' + new Date().getTime() + (Math.floor(Math.random(100)))
        })
      }
      return {wishList};

    // deleting an item from the wishlisht, given the item key
    case DELETE_ITEM:
      wishList = wishList.filter(currentItem => currentItem.key !== item.key)
      return { wishList }

    // clearing the wishlist
    case 'DELETE_ALL_ITEMS':
      wishList= [];
      return {wishList};

    default:
      return state;
  }
};

export default reducer;