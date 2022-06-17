import React, { useEffect } from "react";
import AuthForm from "../Auth/AuthForm";
import { useAuth } from "../context/AuthContextProvider";

const LoginPage = () => {
  const { loginUser } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: "600px" }}>
      <AuthForm
        title={"Войдите чтобы делать покупки"}
        btnText={"Логин"}
        link={"/register"}
        linkText={"Нету ещё аккаунта? Зарегистрируйтесь!"}
        handleSave={loginUser}
      />
    </div>
  );
};

export default LoginPage;
