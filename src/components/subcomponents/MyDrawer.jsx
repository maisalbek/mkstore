import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import Telegram from "../images/telegram.svg";
import WhatsApp from "../images/whatsapp.svg";
import Telephone from "../images/telephone.svg";
import FavoriteIcon from "../images/FavoriteIcon.svg";
import FavoriteIconbadge from "../images/FavoriteIconDot.svg";
import { useFavorite } from "../context/FavoriteContextProvider";
import { useCart } from "../context/CartContextProvider";
import ShoppingBag from "../images/shopping-bag 1.svg";
import ShoppingBagbad from "../images/shopping-bagDot.svg";
import { useAuth } from "../context/AuthContextProvider";

const MyDrawer = ({
  toggleDrawer,
  state,
  headerInfo,
  handleClickOpenMyDialog,
}) => {
  const { fav, getFav } = useFavorite();
  const { cart, getCart } = useCart();
  const { currentUser, logOutUser } = useAuth();

  React.useEffect(() => {
    getFav();
    getCart();
  }, []);

  return (
    <Drawer
      PaperProps={{
        sx: { width: "250px", height: "640px" },
      }}
      anchor={"left"}
      open={state["left"]}
      onClose={() => toggleDrawer("left", false)}
    >
      <div
        style={{
          margin: "18px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#393939",
            }}
          >
            Меню
          </span>
          <CloseIcon onClick={() => toggleDrawer("left", false)} />
        </div>
        <NavLink
          to="/about"
          style={{
            textDecoration: "none",
            marginTop: "20px",
            color: "#393939",
          }}
        >
          <span onClick={() => toggleDrawer("left", false)}>О нас</span>
        </NavLink>
        <NavLink
          to="/news"
          style={{
            textDecoration: "none",
            marginTop: "20px",
            color: "#393939",
          }}
        >
          <span onClick={() => toggleDrawer("left", false)}>Новости</span>
        </NavLink>
        <NavLink
          to="/collection"
          style={{
            textDecoration: "none",
            marginTop: "20px",
            color: "#393939",
          }}
        >
          <span onClick={() => toggleDrawer("left", false)}>Коллекция</span>
        </NavLink>
        {currentUser.isLogged ? (
          <span onClick={logOutUser} style={{ marginTop: "20px" }}>
            <span onClick={() => toggleDrawer("left", false)}>Выйти</span>
          </span>
        ) : null}
        {currentUser.isLogged ? (
          <span
            style={{ marginTop: "20px" }}
            onClick={() => toggleDrawer("left", false)}
          >
            {currentUser.user}
          </span>
        ) : (
          <NavLink to="/login" style={{ marginTop: "20px", color: "#393939" }}>
            <span onClick={() => toggleDrawer("left", false)}>Войти</span>
          </NavLink>
        )}
        <span
          style={{
            width: "100%",
            borderTop: "1px solid #e0e0e0",
            marginTop: "14px",
          }}
        ></span>
        <Link to="/favorite" style={{ textDecoration: "none" }}>
          <span
            style={{
              color: "#393939",
              fontSize: "17px",
              fontWeight: "400",
              display: "flex",
              marginTop: "14px",
            }}
            onClick={() => toggleDrawer("left", false)}
          >
            {fav?.products && fav?.products.length > 0 ? (
              currentUser.isLogged ? (
                <img
                  width="23px"
                  src={FavoriteIconbadge}
                  alt=""
                  style={{ marginRight: "10px" }}
                />
              ) : (
                <img
                  width="23px"
                  src={FavoriteIcon}
                  alt=""
                  style={{ marginRight: "10px" }}
                />
              )
            ) : (
              <img
                width="23px"
                src={FavoriteIcon}
                alt=""
                style={{ marginRight: "10px" }}
              />
            )}
            Избранное
          </span>
        </Link>
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <span
            style={{
              color: "#393939",
              fontSize: "17px",
              fontWeight: "400",
              display: "flex",
              marginTop: "20px",
            }}
            onClick={() => toggleDrawer("left", false)}
          >
            {cart?.products && cart?.products.length > 0 ? (
              currentUser.isLogged ? (
                <img
                  width="23px"
                  src={ShoppingBagbad}
                  alt=""
                  style={{ marginRight: "10px" }}
                />
              ) : (
                <img
                  width="23px"
                  src={ShoppingBag}
                  alt=""
                  style={{ marginRight: "10px" }}
                />
              )
            ) : (
              <img
                width="23px"
                src={ShoppingBag}
                alt=""
                style={{ marginRight: "10px" }}
              />
            )}
            Корзина
          </span>
        </Link>
        <div
          style={{
            width: "100%",
            height: "250px",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontWeight: "500",
                fontSize: "18px",
                marginBottom: "8px",
              }}
              onClick={() => toggleDrawer("left", false)}
            >
              Свяжитсь с нами:
            </span>
            <span
              style={{
                color: "#393939",
                fontSize: "17px",
                fontWeight: "400",
                marginBottom: "8px",
              }}
            >
              <span
                style={{ color: "#979797" }}
                onClick={() => toggleDrawer("left", false)}
              >
                Тел:{" "}
              </span>
              {headerInfo.headerTel}
            </span>
            <div>
              <a href={headerInfo.telegram} target="_blank">
                <img
                  src={Telegram}
                  alt=""
                  style={{ marginRight: "6px" }}
                  onClick={() => {
                    toggleDrawer("left", false);
                  }}
                />
              </a>
              <a href={headerInfo.whatsApp} target="_blank">
                <img
                  src={WhatsApp}
                  alt=""
                  style={{ marginRight: "6px" }}
                  onClick={() => {
                    toggleDrawer("left", false);
                  }}
                />
              </a>
              <img
                src={Telephone}
                alt=""
                onClick={() => {
                  toggleDrawer("left", false);
                  handleClickOpenMyDialog();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default MyDrawer;
