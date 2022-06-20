import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../Firebase";
import { ADMIN_EMAIL, API11 } from "../constants/Constants";
import { notify } from "../Toastify/Toastify";
import { useNavigate } from "react-router-dom";
const authContext = createContext();

export const useAuth = () => useContext(authContext);

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    user: null,
    isAdmin: false,
    isLogged: false,
    fav: {},
    cart: {},
    orderHistory: [],
  });

  const navigate = useNavigate();

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

  const registerUser = async (email, password) => {
    try {
      let { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      let newUser = {
        user: user.email,
        isAdmin: user.email === ADMIN_EMAIL ? true : false,
        isLogged: true,
        fav: {},
        cart: {},
      };
      let news = {
        user: user.email,
        fav: {},
        cart: {},
        orderHistory: [],
      };
      axios.post(API11, news);
      setCurrentUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      notify("success", "Регистрация прошла успешно!");
      navigate("/");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          notify("error", "Некоректная почта!");
          break;
        case "auth/email-already-in-use":
          notify("error", "Пользователь с такой почтой уже существует!");
          break;
        case "auth/weak-password":
          notify("error", "Пароль должен быть не менее 6 символов! ");
          break;
        default:
          notify("error", "Произошла ошибка! ");
      }
    }
  };

  const logOutUser = async () => {
    try {
      await signOut(auth);
      axios.get(API11).then((res) => {
        let cUser = res.data.filter((item) => {
          return item.user === currentUser.user;
        });
        let fav = createFavFromLS();
        cUser[0].fav = fav;
        axios.patch(`${API11}/${cUser[0].id}`, cUser[0]);
        let cart = createCartFromLS();
        cUser[0].cart = cart;
        axios.patch(`${API11}/${cUser[0].id}`, cUser[0]);
      });
      setTimeout(() => {
        let fav = {
          products: [],
        };
        localStorage.setItem("fav", JSON.stringify(fav));
        let cart = {
          products: [],
          totalCount: 0,
          totalOldPrice: 0,
          totalCurrentPrice: 0,
          totalcolors: [],
        };
        localStorage.setItem("cart", JSON.stringify(cart));
      }, 1000);
      let noUser = {
        user: null,
        isAdmin: false,
        isLogged: false,
      };
      setCurrentUser(noUser);
      localStorage.setItem("currentUser", JSON.stringify(noUser));
      notify("warning", "Пользователь вышел из сети!");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const loginUser = async (email, password) => {
    try {
      let { user } = await signInWithEmailAndPassword(auth, email, password);
      let newUser = {
        user: user.email,
        isAdmin: user.email === ADMIN_EMAIL ? true : false,
        isLogged: true,
      };
      axios.get(API11).then((res) => {
        let cUser = res.data.filter((item) => {
          return item.user === user.email;
        });
        let fav = createFavFromLS();
        fav = cUser[0].fav;
        localStorage.setItem("fav", JSON.stringify(fav));
        let cart = createCartFromLS();
        cart = cUser[0].cart;
        localStorage.setItem("cart", JSON.stringify(cart));
      });
      setCurrentUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      notify("success", "Welcome!");
      navigate("/");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          notify("error", "Некорректная почта");
          break;
        case "auth/user-not-found":
          notify("error", "Пользователь с такой почтой не существует");
          break;
        case "auth/wrong-password":
          notify("error", "Неверный пароль");
          break;
        default:
          notify("error", "Произошла ошибка");
      }
    }
  };

  const authListener = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          user: user.email,
          isAdmin: user.email === ADMIN_EMAIL ? true : false,
          isLogged: true,
          fav: {},
          cart: {},
        });
      }
    });
  };
  useEffect(() => {
    authListener();
  }, []);

  const resetPass = async (email) => {
    try {
      let { user } = await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };

  return (
    <authContext.Provider
      value={{
        registerUser,
        currentUser,
        logOutUser,
        loginUser,
        resetPass,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
