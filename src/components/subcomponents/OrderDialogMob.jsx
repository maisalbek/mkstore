import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@mui/styles";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link } from "react-router-dom";
import SuccesDialog from "./SuccesDialog";
import close from "../images/CloseIcon.svg";

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
  paper: { width: "300px", minHeight: "450px" },
}));

const OrderDialogMob = ({ open, handleClose }) => {
  const [inpValues, setInpValues] = useState(INIT_VALUES);
  const [phone, setPhone] = useState("");
  const [isFilled, setIsFilled] = useState(false);
  const classes = useStyles();
  const [open2, setOpen2] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState(true);
  const [emailCheck, setEmailCheck] = useState(true);

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
    } else if (regexPhone.test(inpValues.phone) === true) {
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
      <div className="orderdialog2">
        <img
          src={close}
          alt=""
          style={{
            width: "14px",
            height: "14px",
            position: "absolute",
            top: "3.5%",
            left: "90%",
            cursor: "pointer",
          }}
          onClick={() => {
            handleClose();
          }}
        />
        <span className="dialogtitle2">Оформление заказа</span>
        <span className="labels2">Ваше имя</span>
        <form className="orderform2">
          <input
            className="inpCl"
            required
            type="text"
            name="name"
            placeholder="Например Иван"
            value={inpValues.name}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </form>
        <span className="labels2">Ваше фамилия</span>
        <form className="orderform2">
          <input
            className="inpCl"
            required
            type="text"
            name="surname"
            placeholder="Например Иванов"
            value={inpValues.surname}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </form>
        <span className={emailCheck ? "labels2" : "laberror"}>
          Электронная почта
        </span>
        <form className={emailCheck ? "orderform2" : "orderformerror"}>
          <input
            className="inpCl"
            required
            type="text"
            name="email"
            placeholder="example@mail.com"
            value={inpValues.email}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </form>
        <span className={phoneCheck ? "labels2" : "laberror"}>
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
        <span className="labels2">Страна</span>
        <form className="orderform2">
          <input
            className="inpCl"
            required
            type="text"
            name="country"
            placeholder="Введите страну"
            value={inpValues.country}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </form>
        <span className="labels2">Город </span>
        <form className="orderform2">
          <input
            className="inpCl"
            required
            type="text"
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
            required
            type="checkbox"
            onChange={(e) => {
              handleChangeCheckBox(e);
            }}
          />
          <span className="puboff2">
            Согласен с условиями{" "}
            <Link to="/public" style={{ textDecoration: "none" }}>
              <span style={{ color: "#09a7e6" }}>
                {" "}
                публичной <br /> оферты
              </span>
            </Link>
          </span>
        </div>
        {isFilled ? (
          <div
            className="orderbtnsuc2"
            onClick={() => {
              handleClick();
            }}
          >
            Заказать
          </div>
        ) : (
          <div className="orderbtn2">Заказать</div>
        )}
      </div>
      <SuccesDialog handleClose2={handleClose2} open2={open2} />
    </Dialog>
  );
};

export default OrderDialogMob;
