import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { API, API1 } from "../constants/Constants";

export const productContext = createContext();
export const useProductContext = () => {
  return useContext(productContext);
};
const INIT_STATE = {
  products: [],
  novinki: [],
  productForEdit: null,
  contacts: null,
};
function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload.data,
      };
    case "GET_NOVINKI":
      return {
        ...state,
        novinki: action.payload.data,
      };
    case "GET_PRODUCTFOREDIT":
      return {
        ...state,
        productForEdit: action.payload.data,
      };
    case "GET_CONTACTS":
      return {
        ...state,
        contacts: action.payload.data,
      };
    default:
      return state;
  }
}

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getHitProdaj = async () => {
    try {
      let res = await axios.get(`${API}${"?_limit=8"}`);
      dispatch({
        type: "GET_PRODUCTS",
        payload: res,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const getNovinki = async () => {
    try {
      let res = await axios.get(`${API}${"?_limit=4"}`);
      dispatch({
        type: "GET_NOVINKI",
        payload: res,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const getContacts = async () => {
    try {
      let res = await axios.get(API1);
      dispatch({
        type: "GET_CONTACTS",
        payload: res,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const addProduct = async (product) => {
    try {
      await axios.post(API, product);
      getHitProdaj();
    } catch (err) {
      console.log(err);
    }
  };

  const delProduct = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      getHitProdaj();
    } catch (err) {
      console.log(err);
    }
  };

  const idForEdit = async (id) => {
    try {
      let res = await axios.get(`${API}/${id}`);
      dispatch({
        type: "GET_PRODUCTFOREDIT",
        payload: res,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const saveProduct = async (product) => {
    try {
      await axios.patch(`${API}/${product.id}`, product);
      getHitProdaj();
      getNovinki();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <productContext.Provider
      value={{
        products: state.products,
        novinki: state.novinki,
        productForEdit: state.productForEdit,
        contacts: state.contacts,
        getContacts,
        getHitProdaj,
        getNovinki,
        addProduct,
        delProduct,
        idForEdit,
        saveProduct,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductContextProvider;
