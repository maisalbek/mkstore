import React, { useEffect } from "react";
import AuthForm from "../Auth/AuthForm";
import { useAuth } from "../context/AuthContextProvider";

const LoginPage = () => {
  const { loginUser } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ minHeight: "600px", maxWidth: "700px", margin: "5px 0" }}>
        <AuthForm
          title={"Логин"}
          btnText={"Логин"}
          link={"/register"}
          linkText={"Нету ещё аккаунта? Зарегистрируйтесь!"}
          handleSave={loginUser}
        />
      </div>
    </div>
  );
};

export default LoginPage;
