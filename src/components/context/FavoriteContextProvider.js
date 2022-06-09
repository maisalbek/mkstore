import React, { createContext, useContext, useReducer } from "react";

const favoriteContext = createContext();
export const useFavorite = () => {
  return useContext(favoriteContext);
};

const INIT_STATE = {
  fav: JSON.parse(localStorage.getItem("fav")),
};
function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_FAV":
      return {
        ...state,
        fav: action.payload,
      };
    default:
      return state;
  }
}

const FavoriteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  function createFavFromLS() {
    let fav = JSON.parse(localStorage.getItem("fav"));

    if (!fav) {
      fav = {
        products: [],
      };
      localStorage.setItem("fav", JSON.stringify(fav));
    }
    return fav;
  }

  const addDelToFav = (prod) => {
    let fav = createFavFromLS();
    let newProd = {
      item: prod,
    };

    let checkProdInFav = fav.products.some((obj) => {
      return obj.item.id === prod.id;
    });
    if (checkProdInFav) {
      fav.products = fav.products.filter((obj) => {
        return obj.item.id !== prod.id;
      });
    } else {
      fav.products.push(newProd);
    }
    localStorage.setItem("fav", JSON.stringify(fav));
    dispatch({
      type: "GET_FAV",
      payload: fav,
    });
  };

  const isProdInFav = (id) => {
    let fav = createFavFromLS();
    let exist = fav.products.some((obj) => {
      return obj.item.id === id;
    });
    return exist;
  };

  const getFav = () => {
    let fav = createFavFromLS();
    dispatch({
      type: "GET_FAV",
      payload: fav,
    });
  };

  const deleteProdInFav = (id) => {
    let fav = createFavFromLS();
    fav.products = fav.products.filter((elem) => {
      return elem.item.id !== id;
    });
    localStorage.setItem("fav", JSON.stringify(fav));
    getFav();
  };

  return (
    <favoriteContext.Provider
      value={{
        fav: state.fav,
        addDelToFav,
        getFav,
        deleteProdInFav,
        isProdInFav,
      }}
    >
      {children}
    </favoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
