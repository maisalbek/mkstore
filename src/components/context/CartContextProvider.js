import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";
import {
  API9,
  calcCurrentSubPrice,
  calcOldSubPrice,
  calcTotalCount,
  calcTotalCurrentprice,
  calcTotalOldPrice,
  CART,
} from "../constants/Constants";
import { useAuth } from "./AuthContextProvider";
import { useNavigate } from "react-router-dom";

const cartContext = createContext();

export const useCart = () => {
  return useContext(cartContext);
};

const INIT_STATE = {
  cart: JSON.parse(localStorage.getItem("cart")),
  cartLength: 0,
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case CART.GET_CART_LENGTH:
      return {
        ...state,
        cartLength: action.payload,
      };
    case CART.GET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
}

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  function createCartFromLS() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalCount: 0,
        totalOldPrice: 0,
        totalCurrentPrice: 0,
      };
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
  }

  const addDelToCart = (prod) => {
    if (currentUser.isLogged) {
      let cart = createCartFromLS();
      let newProd = {
        item: prod,
        count: 1,
        id: prod.id,
        color: prod.color,
        currentSubPrice: prod.price,
        oldSubPrice: prod.oldprice,
      };
      let checkProdInCart = cart.products.some((obj) => {
        return obj.item.id === prod.id && obj.item.color === prod.color;
      });
      if (checkProdInCart) {
        cart.products = cart.products.filter((obj) => {
          return obj.item.id !== prod.id && obj.item.color !== prod.color;
        });
      } else {
        cart.products.push(newProd);
      }

      cart.products = cart.products.map((elem) => {
        if (elem.id === prod.id && elem.color === prod.color) {
          elem.currentSubPrice = calcCurrentSubPrice(elem);
          elem.oldSubPrice = calcOldSubPrice(elem);
        }
        return elem;
      });
      cart.totalCount = calcTotalCount(cart.products);
      cart.totalOldPrice = calcTotalOldPrice(cart.products);
      cart.totalCurrentPrice = calcTotalCurrentprice(cart.products);
      localStorage.setItem("cart", JSON.stringify(cart));
      getCartLength();
      dispatch({
        type: CART.GET_CART,
        payload: cart,
      });
    } else {
      navigate("/login");
    }
  };

  const changeProductCount = (newCount, id, color) => {
    if (currentUser.isLogged) {
      if (newCount >= 0) {
        let cart = createCartFromLS();
        cart.products = cart.products.map((elem) => {
          if (elem.id === id && elem.color === color) {
            elem.count = newCount;
            elem.currentSubPrice = calcCurrentSubPrice(elem);
            elem.oldSubPrice = calcOldSubPrice(elem);
          }
          return elem;
        });
        cart.totalOldPrice = calcTotalOldPrice(cart.products);
        cart.totalCount = calcTotalCount(cart.products);
        cart.totalCurrentPrice = calcTotalCurrentprice(cart.products);
        localStorage.setItem("cart", JSON.stringify(cart));
        getCart();
      }
    } else {
      navigate("/login");
    }
  };

  const getCartLength = () => {
    let cart = createCartFromLS();
    dispatch({
      type: CART.GET_CART_LENGTH,
      payload: cart.products.length,
    });
  };

  const isProdInCart = (id, color) => {
    let cart = createCartFromLS();
    let exist = cart.products.some((obj) => {
      return obj.item.id === id && obj.item.color === color;
    });
    return exist;
  };

  const getCart = () => {
    let cart = createCartFromLS();
    dispatch({
      type: CART.GET_CART,
      payload: cart,
    });
  };

  const deleteProdInCart = (inpColor, inpId) => {
    if (currentUser.isLogged) {
      let cart = createCartFromLS();
      let index = cart.products.findIndex(
        (x) => x.id === inpId && x.color === inpColor
      );
      cart.products.splice(index, 1);
      cart.totalOldPrice = calcTotalOldPrice(cart.products);
      cart.totalCount = calcTotalCount(cart.products);
      cart.totalCurrentPrice = calcTotalCurrentprice(cart.products);
      localStorage.setItem("cart", JSON.stringify(cart));
      getCart();
      getCartLength();
    } else {
      navigate("/login");
    }
  };

  const ClearCart = () => {
    window.localStorage.removeItem("cart");
    getCart();
  };

  const sendOrderData = async (obj) => {
    if (currentUser.isLogged) {
      try {
        await axios.post(API9, obj);
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <cartContext.Provider
      value={{
        cartLength: state.cartLength,
        cart: state.cart,
        addDelToCart,
        sendOrderData,
        getCartLength,
        isProdInCart,
        getCart,
        changeProductCount,
        deleteProdInCart,
        ClearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
