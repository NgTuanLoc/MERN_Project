import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  SAVE_SHIPPING_ADDRESS_CART,
  SAVE_PAYMENT_METHOD_CART,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAdress: {} },
  action
) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      const item = action.payload;
      const existedItem = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      );

      if (existedItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) => {
            return cartItem.product === existedItem.product ? item : cartItem;
          }),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.product !== action.payload
        ),
      };
    case SAVE_SHIPPING_ADDRESS_CART:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case SAVE_PAYMENT_METHOD_CART:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
