import * as actionTypes from "../actions/actions";

// {title:string, availibility:bollean, price:number, discount:number, id: number }[]
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
  cart: cart,
  hasCartLoaded: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_ITEM:
      var cart = [...state.cart];
      cart.push(payload.cartObj);
      localStorage.setItem("cart", JSON.stringify(cart));
      return { ...state, cart: cart };
    case actionTypes.REMOVE_ITEM:
      // not using fizlter cause i want to only remove the first occurance and not all
      var cart = [];
      let isPush = true;
      for (let i of state.cart) {
        if (isPush && i.id == payload.id) {
          isPush = false;
          continue;
        }
        cart.push(i);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      return { ...state, cart: cart };
    case actionTypes.LOAD_CART:
      localStorage.setItem("cart", JSON.stringify(payload.cart));
      return { ...state, cart: payload.cart, hasCartLoaded: true };
    case actionTypes.CLEAR_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
};
