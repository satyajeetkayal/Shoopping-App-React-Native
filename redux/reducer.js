import {
  ADD_TO_CART,
  EMPTY_CART,
  REMOVE_FROM_CART,
  SET_USER,
} from './actionTypes';
const initialState = {
  basket: [],
  total: 0,
  user: null,
  title: '',
  image: '',
};

const cartReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        basket: [...state.basket, action.payload],
        total: state.total + action.payload.price,
        title: action.payload.title,
        image: action.payload.image,
      };
    }

    case REMOVE_FROM_CART: {
      const index = state.basket.findIndex(
        basketItem => basketItem.id === action.payload.id,
      );
      const newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product(id: ${action.payload.id}) as it's not in basket.`,
        );
      }
      return {
        ...state,
        basket: newBasket,
        total: state.total - action.payload.price,
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    case EMPTY_CART: {
      return {
        basket: [],
        total: 0,
      };
    }
  }
  return state;
};

export default cartReducer;
