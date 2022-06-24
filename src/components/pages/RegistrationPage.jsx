import React, { useEffect } from "react";
import AuthForm from "../Auth/AuthForm";
import { useAuth } from "../context/AuthContextProvider";

const RegistrationPage = () => {
  const { registerUser } = useAuth();

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
      <div style={{ height: "550px", maxWidth: "700px", margin: "5px 0" }}>
        <AuthForm
          title={"Регистрация"}
          btnText={"Регистрироваться"}
          link={"/login"}
          linkText={"Уже есть аккаунт? Логин!"}
          handleSave={registerUser}
        />
      </div>
    </div>
  );
};

export default RegistrationPage;
