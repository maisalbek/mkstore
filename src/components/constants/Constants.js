// export const API = "http://localhost:8001/products";
// export const API1 = "http://localhost:8001/footer"; //footer
// export const API2 = "http://localhost:8001/header"; //header
// export const API3 = "http://localhost:8001/slider"; //slider
// export const API4 = "http://localhost:8001/advantages"; //advantages
// export const API5 = "http://localhost:8001/collection"; //collection
// export const API6 = "http://localhost:8001/about"; //about
// export const API7 = "http://localhost:8001/news"; //news
// export const API8 = "http://localhost:8001/help"; //help
// export const API10 = "http://localhost:8001/publicOffer"; //publicOffer
// export const API11 = "http://localhost:8001/users"; //users

export const API = "https://mkdatabase.herokuapp.com/products";
export const API1 = "https://mkdatabase.herokuapp.com/footer"; //footer
export const API2 = "https://mkdatabase.herokuapp.com/header"; //header
export const API3 = "https://mkdatabase.herokuapp.com/slider"; //slider
export const API4 = "https://mkdatabase.herokuapp.com/advantages"; //advantages
export const API5 = "https://mkdatabase.herokuapp.com/collection"; //collection
export const API6 = "https://mkdatabase.herokuapp.com/about"; //about
export const API7 = "https://mkdatabase.herokuapp.com/news"; //news
export const API8 = "https://mkdatabase.herokuapp.com/help"; //help
export const API10 = "https://mkdatabase.herokuapp.com/publicOffer"; //publicOffer
export const API11 = "https://mkdatabase.herokuapp.com/users"; //users

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
export const calcTotalColors = (arr) => {
  let total = [];
  arr.forEach((item) => {
    total.push(item.color);
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
