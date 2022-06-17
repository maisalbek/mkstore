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
  paper: { width: "390px" },
}));

const MyDialog = ({ open, setOpen }) => {
  const [inpValues, setInpValues] = useState({ title: "", phone: "" });
  const [secondPart, setSecondPart] = useState(false);
  const classes = useStyles();
  const [error, setError] = useState(true);

  useEffect(() => {
    let regex = /^[0]\d{9}$/;
    if (
      inpValues.title === "" ||
      inpValues.phone === "" ||
      !regex.test(inpValues.phone)
    ) {
      setError(false);
    } else {
      setError(true);
    }
  }, [inpValues]);

  const handleChange = (e) => {
    let obj = {
      ...inpValues,
      [e.target.name]: e.target.value,
    };
    setInpValues(obj);
  };

  const handleSubmit = (obj) => {
    setSecondPart(true);
    setInpValues({ title: "", phone: "" });
  };

  const handleCloseMyDialog = () => {
    setOpen(false);
  };
  return (
    <Dialog
      classes={secondPart ? { paper: classes.paper } : null}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseMyDialog}
      aria-describedby="alert-dialog-slide-description"
    >
      {secondPart ? (
        <div className="float-menu-container">
          <img id="sendImage" width="70px" src={send} alt="" />
          <span className="float-send-headerText">Спасибо!</span>
          <span className="float-send-text">
            Ваша заявка была принята ожидайте, скоро Вам перезвонят
          </span>
          <button
            className="zakazat-btn"
            style={{
              backgroundColor: "#1D1D1B",
              marginTop: "16px",
              cursor: "pointer",
            }}
            onClick={() => {
              handleCloseMyDialog();
              setSecondPart(false);
            }}
          >
            Продолжить покупки
          </button>
        </div>
      ) : (
        <div className="float-menu-container">
          <img
            className="closeMyDialog"
            src={CloseIcon}
            onClick={handleCloseMyDialog}
            alt=""
          />
          <span className="float-menu-headerText">
            Если у Вас остались вопросы
          </span>
          <span className="float-menu-text">
            Оставьте заявку и мы обязательно Вам перезвоним
          </span>
          <form className="formdialog">
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
          <form className="formdialog">
            <img
              style={{ margin: "0 15px", width: "20px" }}
              src={TelephoneIcon}
              alt=""
            />
            <input
              className="float-input1"
              type="number"
              name="phone"
              placeholder="Номер телефона"
              value={inpValues.phone}
              onChange={(e) => handleChange(e)}
            />
          </form>
          {error ? (
            <button
              className="zakazat-btn"
              style={{ backgroundColor: "#1D1D1B", cursor: "pointer" }}
              onClick={() => {
                handleSubmit(inpValues);
              }}
            >
              Заказать звонок
            </button>
          ) : (
            <button
              className="zakazat-btn"
              style={{ backgroundColor: "rgb(121, 118, 118)" }}
            >
              Заказать звонок
            </button>
          )}
        </div>
      )}
    </Dialog>
  );
};

export default MyDialog;
