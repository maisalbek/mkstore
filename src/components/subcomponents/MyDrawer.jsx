import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import Telegram from "../images/telegram.svg";
import WhatsApp from "../images/whatsapp.svg";
import Telephone from "../images/telephone.svg";
import FavoriteIcon from "../images/FavoriteIcon.svg";
import ShoppingBag from "../images/shopping-bag 1.svg";
import MyDialog from "./MyDialog";

const MyDrawer = ({ toggleDrawer, state, headerInfo }) => {
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      PaperProps={{
        sx: { width: "250px", height: "540px" },
      }}
      anchor={"left"}
      open={state["left"]}
      onClose={toggleDrawer("left", false)}
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
          <CloseIcon onClick={toggleDrawer("left", false)} />
        </div>
        <NavLink
          to="/about"
          style={{
            textDecoration: "none",
            marginTop: "20px",
            color: "#393939",
          }}
        >
          <span>О нас</span>
        </NavLink>
        <NavLink
          to="/news"
          style={{
            textDecoration: "none",
            marginTop: "20px",
            color: "#393939",
          }}
        >
          <span>Новости</span>
        </NavLink>
        <NavLink
          to="/collection"
          style={{
            textDecoration: "none",
            marginTop: "20px",
            color: "#393939",
          }}
        >
          <span>Коллекция</span>
        </NavLink>
        <Link to="/favorite" style={{ textDecoration: "none" }}>
          <span
            style={{
              color: "#393939",
              fontSize: "17px",
              fontWeight: "400",
              display: "flex",
              marginTop: "14px",
              paddingTop: "14px",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <img
              width="23px"
              src={FavoriteIcon}
              alt=""
              style={{ marginRight: "10px" }}
            />
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
          >
            <img
              width="23px"
              src={ShoppingBag}
              alt=""
              style={{ marginRight: "10px" }}
            />
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
              <span style={{ color: "#979797" }}>Тел: </span>
              {headerInfo.headerTel}
            </span>
            <div>
              <a href={headerInfo.telegram} target="_blank">
                <img src={Telegram} alt="" style={{ marginRight: "6px" }} />
              </a>
              <a href={headerInfo.whatsApp} target="_blank">
                <img src={WhatsApp} alt="" style={{ marginRight: "6px" }} />
              </a>
              <img
                src={Telephone}
                alt=""
                onClick={() => {
                  handleClickOpen();
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <MyDialog handleClose={handleClose} open={open} />
    </Drawer>
  );
};

export default MyDrawer;
