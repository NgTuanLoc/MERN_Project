import axios from "axios";
import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  SAVE_SHIPPING_ADDRESS_CART,
  SAVE_PAYMENT_METHOD_CART,
} from "../constants/cartConstants";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: ADD_ITEM_TO_CART,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_FROM_CART,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddressFromCart =
  (shippingAddress) => (dispatch, getState) => {
    dispatch({
      type: SAVE_SHIPPING_ADDRESS_CART,
      payload: shippingAddress,
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(getState().cart.shippingAddress)
    );
  };

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD_CART,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
