import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@mui/styles";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link } from "react-router-dom";
import SuccesDialog from "./SuccesDialog";
import close from "../images/CloseIcon.svg";
import { useCart } from "../context/CartContextProvider";

const INIT_VALUES = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  country: "",
  city: "",
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
  paper: { width: "440px", height: "670px" },
}));

const OrderDialog = ({ open, handleClose }) => {
  const [inpValues, setInpValues] = useState(INIT_VALUES);
  const [phone, setPhone] = useState("");
  const [isFilled, setIsFilled] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState(true);
  const [emailCheck, setEmailCheck] = useState(true);
  const { sendOrderData } = useCart();
  const classes = useStyles();

  const [open2, setOpen2] = useState(false);

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  useEffect(() => {
    checkInput();
  }, [inpValues]);
  useEffect(() => {
    handleChangePhoneInput();
  }, [phone]);

  const handleChange = (e) => {
    let obj = {
      ...inpValues,
      [e.target.name]: e.target.value,
    };
    setInpValues(obj);
    checkInput();
  };
  const handleChangePhoneInput = () => {
    let obj = {
      ...inpValues,
      phone: phone,
    };
    setInpValues(obj);
    checkInput();
  };
  const handleChangeCheckBox = (e) => {
    let obj = {
      ...inpValues,
      checked: e.target.checked,
    };
    setInpValues(obj);
    checkInput();
  };

  const checkInput = () => {
    if (
      !inpValues.name ||
      !inpValues.surname ||
      !inpValues.email ||
      !inpValues.checked ||
      !inpValues.phone ||
      !inpValues.country ||
      !inpValues.city
    ) {
      setIsFilled(false);
    } else {
      setIsFilled(true);
    }
  };

  const handleClick = () => {
    let regexEmail = /\S+@\S+\.\S+/;
    let regexPhone = /^.{9,17}$/;
    if (
      regexPhone.test(inpValues.phone) === false ||
      regexEmail.test(inpValues.email) === false
    ) {
      setIsFilled(false);
      if (regexPhone.test(inpValues.phone) === false) {
        setPhoneCheck(false);
      } else if (regexEmail.test(inpValues.email) === false) {
        setEmailCheck(false);
      }
    } else if (
      regexPhone.test(inpValues.phone) === true &&
      regexEmail.test(inpValues.email) === true
    ) {
      sendOrderData(inpValues);
      handleClose();
      handleClickOpen2();
    }
  };
  return (
    <Dialog
      classes={{ paper: classes.paper }}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="orderdialog">
        <img
          src={close}
          alt=""
          style={{
            width: "14px",
            height: "14px",
            position: "absolute",
            top: "4%",
            left: "92%",
            cursor: "pointer",
          }}
          onClick={() => {
            handleClose();
          }}
        />
        <span className="dialogtitle">Оформление заказа</span>
        <span className="labels">Ваше имя</span>
        <form className="orderform">
          <input
            className="inpCl"
            type="text"
            required
            name="name"
            placeholder="Например Иван"
            value={inpValues.name}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </form>
        <span className="labels">Ваше фамилия</span>
        <form className="orderform">
          <input
            className="inpCl"
            type="text"
            required
            name="surname"
            placeholder="Например Иванов"
            value={inpValues.surname}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </form>
        <span className={emailCheck ? "labels" : "laberror"}>
          Электронная почта
        </span>
        <form className={emailCheck ? "orderform" : "orderformerror"}>
          <input
            className="inpCl"
            type="email"
            required
            id="asd"
            name="email"
            placeholder="example@mail.com"
            value={inpValues.email}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </form>
        <span className={phoneCheck ? "labels" : "laberror"}>
          Ваш номер телефона
        </span>
        <PhoneInput
          international
          defaultCountry="KG"
          placeholder="Enter phone number"
          name="phone"
          required
          value={phone}
          onChange={setPhone}
          style={{
            margin: "4px 0",
            border: phoneCheck ? "1px solid #e7e7e7" : "1px solid red",
          }}
        />
        <span className="labels">Страна</span>
        <form className="orderform">
          <input
            className="inpCl"
            type="text"
            name="country"
            required
            placeholder="Введите страну"
            value={inpValues.country}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </form>
        <span className="labels">Город </span>
        <form className="orderform">
          <input
            className="inpCl"
            type="text"
            required
            name="city"
            placeholder="Введите город"
            value={inpValues.city}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </form>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            id="cb1"
            type="checkbox"
            name="checkbox"
            required
            onChange={(e) => {
              handleChangeCheckBox(e);
            }}
          />
          <span className="puboff">
            Согласен с условиями{" "}
            <Link to="/public" style={{ textDecoration: "none" }}>
              <span style={{ color: "#09a7e6" }}> публичной оферты</span>
            </Link>
          </span>
        </div>
        {isFilled ? (
          <div
            className="orderbtnsuc"
            onClick={() => {
              handleClick();
            }}
          >
            Заказать
          </div>
        ) : (
          <div className="orderbtn">Заказать</div>
        )}
      </div>
      <SuccesDialog handleClose2={handleClose2} open2={open2} />
    </Dialog>
  );
};

export default OrderDialog;
