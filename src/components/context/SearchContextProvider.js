import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { API } from "../constants/Constants";

const searchContext = createContext();
export const useSearchContext = () => {
  return useContext(searchContext);
};

const INIT_STATE = {
  ForSearch: [],
  filteredData: [],
  requestword: "",
};
function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_ALL_DATA":
      return {
        ...state,
        ForSearch: action.payload.data,
      };
    case "GET_SEARCH_DATA":
      return {
        ...state,
        filteredData: action.payload,
      };
    case "GET_REQ_WORD":
      return {
        ...state,
        requestword: action.payload,
      };
    default:
      return state;
  }
}

const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getData = async () => {
    try {
      let res = await axios.get(API);
      dispatch({
        type: "GET_ALL_DATA",
        payload: res,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const sendSearchData = (arr, req) => {
    dispatch({
      type: "GET_SEARCH_DATA",
      payload: arr,
    });
    dispatch({
      type: "GET_REQ_WORD",
      payload: req,
    });
  };

  return (
    <searchContext.Provider
      value={{
        getData,
        sendSearchData,
        filteredData: state.filteredData,
        requestword: state.requestword,
        ForSearch: state.ForSearch,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

export default SearchContextProvider;
