import React from "react";
import send from "../images/sendImage.svg";
import { makeStyles } from "@mui/styles";
import { Dialog, Slide } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContextProvider";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
  paper: { width: "390px" },
}));
const SuccesDialog = ({ open2, handleClose2 }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { ClearCart } = useCart();

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      open={open2}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose2}
      aria-describedby="alert-dialog-slide-description"
    >
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
            handleClose2();
            navigate("/");
            ClearCart();
          }}
        >
          Продолжить покупки
        </button>
      </div>
    </Dialog>
  );
};

export default SuccesDialog;
