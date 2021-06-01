import {ADD_TO_CART, REMOVE_FROM_CART} from './actionTypes';
const initialState = {
  basket: [],
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        basket: [...state.basket, action.payload],
        total: state.total + action.payload.price,
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
  }
  return state;
};

export default cartReducer;
