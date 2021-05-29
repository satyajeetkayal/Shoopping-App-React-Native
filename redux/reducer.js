import {ADD_TO_CART} from './actionTypes';
const initialState = {
  basket: [],
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        basket: [...state.basket, action.payload],
        total: state.total + action.payload.price,
      };
    }
  }
};

export default cartReducer;
