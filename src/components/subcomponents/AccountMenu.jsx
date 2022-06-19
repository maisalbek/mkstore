import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useAuth } from "../context/AuthContextProvider";
import { makeStyles } from "@material-ui/core";
import close from "../images/CloseIcon.svg";

const useStyles = makeStyles({
  customWidth: {
    "& div": {
      width: "250px",
    },
  },
});

const AccountMenu = ({ anchorEl, handleClose }) => {
  const classes = useStyles();
  const { currentUser, logOutUser } = useAuth();

  return (
    <div>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.customWidth}
      >
        <MenuItem
          sx={{ width: "200px" }}
          onClick={() => {
            handleClose();
            logOutUser();
          }}
        >
          Выйти
        </MenuItem>
        <MenuItem onClick={handleClose}>{currentUser.user}</MenuItem>
        <img
          src={close}
          alt=""
          style={{
            width: "14px",
            height: "14px",
            position: "absolute",
            top: "10%",
            left: "90%",
            cursor: "pointer",
          }}
          onClick={() => {
            handleClose();
          }}
        />
      </Menu>
    </div>
  );
};

export default AccountMenu;
