import React, { createContext, useContext, useState } from "react";

export const productContext = createContext();
export const useProductContext = () => {
  return useContext(productContext);
};

const ProductContextProvider = ({ children }) => {
  const [typeCollection, setTypeCollection] = useState("");
  const idForEdit = (str) => {
    setTypeCollection(str);
  };

  return (
    <productContext.Provider value={{ typeCollection, idForEdit }}>
      {children}
    </productContext.Provider>
  );
};

export default ProductContextProvider;
