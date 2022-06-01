import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import AccountIcon from "../images/AccountIcon.svg";
import TelephoneIcon from "../images/telephoneIcon.svg";
import send from "../images/sendImage.svg";
import CloseIcon from "../images/CloseIcon.svg";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@mui/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
  paper: { maxWidth: "390px" },
}));

const MyDialog = ({ open, handleClose }) => {
  const [inpValues, setInpValues] = useState({ title: "", phone: "" });
  const [openSend, setOpenSend] = useState(false);
  const [dialogSize, setDialogSize] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setOpenSend(false);
    setDialogSize(false);
  }, []);

  const handleChange = (e) => {
    let obj = {
      ...inpValues,
      [e.target.name]: e.target.value,
    };
    setInpValues(obj);
  };

  const handleSubmit = (obj) => {
    let regex = /^[0]\d{9}$/;
    if (obj.title == "" || obj.phone == "") {
      alert("Пожалуйста заполните поля!");
    } else if (regex.test(obj.phone)) {
      setOpenSend(true);
    } else {
      alert("Неверный номер!");
    }
    setInpValues({ title: "", phone: "" });
  };
  return (
    <Dialog
      classes={dialogSize ? { paper: classes.paper } : null}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      {openSend ? (
        <div className="float-menu-container">
          <img id="sendImage" width="70px" src={send} alt="" />
          <span className="float-send-headerText">Спасибо!</span>
          <span className="float-send-text">
            Ваша заявка была принята ожидайте, скоро Вам перезвонят
          </span>
          <button
            className="zakazat-btn"
            style={{ backgroundColor: "#1D1D1B", marginTop: "16px" }}
            onClick={() => {
              handleClose();
              setOpenSend(false);
              setDialogSize(false);
            }}
          >
            Продолжить покупки
          </button>
        </div>
      ) : (
        <div className="float-menu-container">
          <img
            style={{ position: "absolute", left: "92%", top: "5%" }}
            src={CloseIcon}
            onClick={handleClose}
            alt=""
          />
          <span className="float-menu-headerText">
            Если у Вас остались вопросы
          </span>
          <span className="float-menu-text">
            Оставьте заявку и мы обязательно Вам перезвоним
          </span>
          <form style={{ width: "98.5%", margin: "0", marginTop: "12px" }}>
            <img
              style={{ margin: "0 15px", width: "20px" }}
              src={AccountIcon}
              alt=""
            />
            <input
              className="float-input1"
              type="search"
              name="title"
              placeholder="Как вам обращаться?"
              value={inpValues.title}
              onChange={(e) => handleChange(e)}
            />
          </form>
          <form style={{ width: "98.5%", margin: "0", marginTop: "10px" }}>
            <img
              style={{ margin: "0 15px", width: "20px" }}
              src={TelephoneIcon}
              alt=""
            />
            <input
              className="float-input2"
              type="search"
              name="phone"
              placeholder="Номер телефона"
              value={inpValues.phone}
              onChange={(e) => handleChange(e)}
            />
          </form>
          <button
            className="zakazat-btn"
            style={
              inpValues.phone !== ""
                ? { backgroundColor: "#1D1D1B" }
                : { backgroundColor: "rgb(121, 118, 118)" }
            }
            onClick={() => {
              handleSubmit(inpValues);
              setDialogSize(true);
            }}
          >
            Заказать звонок
          </button>
        </div>
      )}
    </Dialog>
  );
};

export default MyDialog;
