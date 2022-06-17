import React, { useEffect } from "react";
import AuthForm from "../Auth/AuthForm";
import { useAuth } from "../context/AuthContextProvider";

const RegistrationPage = () => {
  const { registerUser } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: "550px" }}>
      <AuthForm
        title={"Регистрация"}
        btnText={"Регистрироваться"}
        link={"/login"}
        linkText={"Уже есть аккаунт? Логин!"}
        handleSave={registerUser}
      />
    </div>
  );
};

export default RegistrationPage;
