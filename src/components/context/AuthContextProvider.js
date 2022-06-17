import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../Firebase";
import { ADMIN_EMAIL } from "../constants/Constants";
import { notify } from "../Toastify/Toastify";
import { useNavigate } from "react-router-dom";
const authContext = createContext();

export const useAuth = () => useContext(authContext);

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    user: null,
    isAdmin: false,
    isLogged: false,
  });

  const navigate = useNavigate();

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
      };
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
      let noUser = {
        user: null,
        isAdmin: false,
        isLogged: false,
      };
      setCurrentUser(noUser);
      localStorage.setItem("currentUser", JSON.stringify(noUser));
      notify("warning", "Пользователь вышел из сети!");
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
