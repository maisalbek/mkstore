import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HistoryCard from "../subcomponents/HistoryCard";
import "./OrderHistory.css";
import { useCart } from "../context/CartContextProvider";
import close from "../images/CloseIcon.svg";
import { useAuth } from "../context/AuthContextProvider";

const OrderHistory = () => {
  const { getHistory, history, clearHistory } = useCart();
  const [orderData, setOrderData] = useState([]);
  const { currentUser } = useAuth();
  useEffect(() => {
    getHistory();
  }, []);

  useEffect(() => {
    getHistory();
  }, [orderData]);

  useEffect(() => {
    if (history) {
      setOrderData(history);
    }
  }, []);

  const handleClick = (str) => {
    clearHistory(str);
    setOrderData([]);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="collectionOuter">
        <span style={{ margin: "22px 0" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#393939" }}>
            <span className="breadcrumbs">Главная</span>
          </Link>
          <span style={{ margin: "0 12px" }}>/</span>
          <Link to="/cart" style={{ textDecoration: "none", color: "#393939" }}>
            <span className="breadcrumbs">Корзина</span>
          </Link>
          <span style={{ margin: "0 12px" }}>/</span>
          <span className="breadcrumbs third">История заказов</span>
        </span>
        {orderData && orderData.length > 0 ? (
          <span
            className="breadcrumbs"
            style={{
              margin: "22px 0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => {
              handleClick(currentUser.user);
            }}
          >
            <img
              src={close}
              alt=""
              style={{ width: "14px", height: "14px", marginRight: "5px" }}
            />
            Очистить
          </span>
        ) : null}
      </div>
      <div className="orderHistory">
        {orderData && orderData.length > 0 ? (
          orderData.map((item, index) => (
            <HistoryCard key={index} item={item} />
          ))
        ) : (
          <span className="historyTxt">Ваша история заказов пусто</span>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
