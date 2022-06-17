export const API = "http://localhost:8001/products";
export const API1 = "http://localhost:8001/footer"; //footer
export const API2 = "http://localhost:8001/header"; //header
export const API3 = "http://localhost:8001/slider"; //slider
export const API4 = "http://localhost:8001/advantages"; //advantages
export const API5 = "http://localhost:8001/collection"; //collection
export const API6 = "http://localhost:8001/about"; //about
export const API7 = "http://localhost:8001/news"; //news
export const API8 = "http://localhost:8001/help"; //help
export const API9 = "http://localhost:8001/orderData"; //orderData
export const API10 = "http://localhost:8001/publicOffer"; //publicOffer

export const ADMIN_EMAIL = "admin-zeon@gmail.com";

export const CART = {
  GET_CART_LENGTH: "GET_CART_LENGTH",
  GET_CART: "GET_CART",
};

export const calcTotalCount = (arr) => {
  let total = 0;
  arr.forEach((item) => {
    total += item.count;
  });
  return total;
};

export const calcTotalOldPrice = (arr) => {
  let total = 0;
  arr.forEach((item) => {
    total += item.oldSubPrice;
  });
  return total;
};

export const calcTotalCurrentprice = (arr) => {
  let total = 0;
  arr.forEach((item) => {
    total += item.currentSubPrice;
  });
  return total;
};

export const calcCurrentSubPrice = (elem) => {
  return elem.count * elem.item.price;
};
export const calcOldSubPrice = (elem) => {
  if (elem.item.oldprice == 0) {
    return elem.count * elem.item.price;
  } else {
    return elem.count * elem.item.oldprice;
  }
};
