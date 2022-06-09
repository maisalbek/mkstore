import React, { useState, useEffect } from "react";
import ArrowUp from "../images/ArrowUpIcon.svg";
import ChatIcon from "../images/ChatIcon.svg";
import Telegram from "../images/telegram.svg";
import WhatsApp from "../images/whatsapp.svg";
import Telephone from "../images/telephone.svg";
import CloseIcon from "../images/CloseIcon.svg";
import { API1 } from "../constants/Constants";
import axios from "axios";
import MyDialog from "./MyDialog";

const FloatMenu = () => {
  const [floatButton, setFloatButton] = useState(false);
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState({});

  useEffect(() => {
    axios.get(API1).then((response) => {
      setContact(response.data);
    });
  }, []);

  const toggleFloatMenu = () => {
    floatButton ? setFloatButton(false) : setFloatButton(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setFloatButton(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          left: "90%",
          top: "80%",
          zIndex: 3,
        }}
      >
        <div className="float-menu">
          <img
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            style={{ width: "25px", marginBottom: "30px", cursor: "pointer" }}
            src={ArrowUp}
            alt=""
          />
          {floatButton ? (
            <img
              onClick={() => {
                toggleFloatMenu();
              }}
              width="25px"
              src={CloseIcon}
              alt=""
              style={{ cursor: "pointer" }}
            />
          ) : (
            <img
              onClick={() => {
                toggleFloatMenu();
              }}
              width="25px"
              src={ChatIcon}
              alt=""
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
      </div>
      {floatButton ? (
        <div className="floatmenuSizeChange">
          <a href={contact.telegram}>
            <img
              style={{ width: "44px", margin: "6px" }}
              src={Telegram}
              alt=""
            />
          </a>
          <a href={contact.whatsApp}>
            <img
              style={{ width: "44px", margin: "6px" }}
              src={WhatsApp}
              alt=""
            />
          </a>
          <img
            onClick={handleClickOpen}
            style={{ width: "44px", margin: "6px", cursor: "pointer" }}
            src={Telephone}
            alt=""
          />
        </div>
      ) : null}
      <MyDialog handleClose={handleClose} open={open} />
    </div>
  );
};

export default FloatMenu;
