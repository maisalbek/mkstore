import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <img
        style={{ width: "320px", marginBottom: "10px" }}
        src="https://static.vecteezy.com/system/resources/previews/002/416/562/non_2x/404-error-and-page-not-found-illustration-vector.jpg"
        alt=""
      />
      <span
        style={{
          color: "#ffffff",
          padding: "15px 40px",
          backgroundColor: "#1d1d1d",
          width: "200px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        На главную
      </span>
    </div>
  );
};

export default ErrorPage;
