import { Button, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import { notify } from "../toastify/Toastify";
import { useAuth } from "../context/AuthContextProvider";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockResetIcon from "@mui/icons-material/LockReset";
import { makeStyles } from "@material-ui/core/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Developed by Zeon{" "}
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}
const ResetPass = () => {
  const { resetPass } = useAuth();
  const [inpVal, setInpVal] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setInpVal(e.target.value);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!inpVal) {
      notify("error", "Заполните поле!");
    } else {
      resetPass(inpVal);
      setInpVal("");
    }
  };

  const useStyles = makeStyles(() => ({
    input1: {
      height: "40px",
    },
    input2: {
      height: "20px",
    },
  }));

  const classes = useStyles();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        justifyContent: "center",
        height: "550px",
      }}
    >
      <div style={{ backgroundColor: "#ffffff" }}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "black" }}>
            <LockResetIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            style={{ fontFamily: "Montserrat" }}
          >
            Восстановление пароля
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Эл-почта"
              value={inpVal}
              onChange={(e) => handleChange(e)}
              InputProps={{ classes: { input: classes.input1 } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#1d1d1d",
                borderRadius: "0",
                zIndex: "0",
              }}
              className="registerbtn"
              onClick={(e) => {
                return handleSendEmail(e);
              }}
            >
              Отправить код подтверждения
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default ResetPass;
